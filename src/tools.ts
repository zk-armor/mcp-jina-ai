import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { JinaAIAPIClient } from "./client";

export function registerAllTools(server: McpServer, jinaClient: JinaAIAPIClient) {

    // Define the schema for the embeddings tool input
    const embeddingsInputSchema = z.object({
        input: z.union([z.string(), z.array(z.string())]).describe("The input text or texts to embed."),
        model: z.string().describe("The name of the model to use for embeddings."),
    });

    // Register the embeddings tool
    server.registerTool(
        "embeddings",
        {
            title: "Jina AI Embeddings",
            description: "Creates an embedding vector representing the input text.",
            inputSchema: {
                input: z.union([z.string(), z.array(z.string())]).describe("The input text or texts to embed."),
                model: z.string().describe("The name of the model to use for embeddings."),
            },
        },
        async (input) => {
            const result = await jinaClient.embeddings(input.input, input.model);
            return {
                content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            };
        }
    );

    // Define the schema for the rerank tool input
    const rerankInputSchema = {
        query: z.string().describe("The query to use for reranking."),
        documents: z.array(z.string()).describe("A list of documents to rerank."),
        model: z.string().describe("The name of the model to use for reranking."),
        top_n: z.number().optional().describe("The number of documents to return."),
    };

    // Register the rerank tool
    server.registerTool(
        "rerank",
        {
            title: "Jina AI Rerank",
            description: "Reranks a list of documents based on a query.",
            inputSchema: rerankInputSchema,
        },
        async (input) => {
            const result = await jinaClient.rerank(input.documents, input.query, input.model, input.top_n);
            return {
                content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            };
        }
    );

    // Define the schema for the generate tool input
    const generateInputSchema = {
        input: z.any().describe("The input prompt or messages for the chat model."),
        model: z.string().describe("The name of the model to use for generation."),
        options: z.record(z.any()).optional().describe("Additional options for the generation endpoint."),
    };

    // Register the generate tool
    server.registerTool(
        "generate",
        {
            title: "Jina AI Generate",
            description: "Generates a response from a chat model.",
            inputSchema: generateInputSchema,
        },
        async (input) => {
            const result = await jinaClient.generate(input.input, input.model, input.options);
            return {
                content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
            };
        }
    );

    // ... other tools will be registered here
} 