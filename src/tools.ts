import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { JinaAIAPIClient } from "./client";
import * as fs from "fs/promises";
import * as path from "path";

export function registerAllTools(server: McpServer, jinaClient: JinaAIAPIClient) {

    // 1. Embeddings
    server.registerTool("embeddings", {
        title: "Jina AI Embeddings",
        description: "Creates an embedding vector representing the input text.",
        inputSchema: {
            input: z.union([z.string(), z.array(z.string())]).describe("The input text or texts to embed."),
            model: z.string().describe("The name of the model to use for embeddings, e.g., 'jina-embeddings-v2-base-en'."),
        },
    }, async (input) => {
        const result = await jinaClient.embeddings(input);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    });

    // 2. Rerank
    server.registerTool("rerank", {
        title: "Jina AI Rerank",
        description: "Reranks a list of documents based on a query.",
        inputSchema: {
            query: z.string().describe("The query to use for reranking."),
            documents: z.array(z.string()).describe("A list of documents to rerank."),
            model: z.string().describe("The name of the model to use for reranking."),
            top_n: z.number().optional().describe("The number of documents to return."),
        },
    }, async (input) => {
        const result = await jinaClient.rerank(input);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    });

    // 3. Read
    server.registerTool("read", {
        title: "Jina AI Reader",
        description: "Input a single website URL and get an LLM-friendly version of that single website.",
        inputSchema: {
            url: z.string().url().describe("The URL of the website to read."),
            options: z.record(z.any()).optional().describe("An object for additional headers like 'X-Target-Selector' or 'X-Return-Format'."),
        },
    }, async ({ url, options }) => {
        const result = await jinaClient.read({ url }, options);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    });

    // 4. Search
    server.registerTool("search", {
        title: "Jina AI Search",
        description: "Given a search term, get an LLM-friendly version of all websites in the search results.",
        inputSchema: {
            query: z.string().describe("The search query."),
            options: z.record(z.any()).optional().describe("An object for additional search parameters and headers."),
        },
    }, async ({ query, options }) => {
        const result = await jinaClient.search({ q: query }, options);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    });

    // 5. DeepSearch
    server.registerTool("deepsearch", {
        title: "Jina AI DeepSearch",
        description: "Combines web searching, reading, and reasoning for comprehensive investigation.",
        inputSchema: {
            messages: z.array(z.object({
                role: z.enum(["user", "assistant"]),
                content: z.string(),
            })).describe("A list of messages forming the conversation so far."),
            model: z.string().describe("ID of the model to use, e.g., 'jina-deepsearch-v1'."),
            options: z.record(z.any()).optional().describe("Additional options like 'stream', 'reasoning_effort', etc."),
        },
    }, async (input) => {
        const result = await jinaClient.deepsearch(input);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    });

    // 6. Segment
    server.registerTool("segment", {
        title: "Jina AI Segmenter",
        description: "Given a text, splits it into segments or counts tokens.",
        inputSchema: {
            content: z.string().describe("The text content to segment."),
            options: z.record(z.any()).optional().describe("An object for options like 'tokenizer', 'return_chunks', etc."),
        },
    }, async (input) => {
        const result = await jinaClient.segment(input);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    });

    // 7. Classify
    server.registerTool("classify", {
        title: "Jina AI Classifier",
        description: "Zero-shot classification for text.",
        inputSchema: {
            input: z.array(z.string()).describe("Array of text inputs for classification."),
            labels: z.array(z.string()).describe("List of labels for classification."),
            model: z.string().describe("Model to use, e.g., 'jina-embeddings-v3' for text."),
        },
    }, async (input) => {
        const result = await jinaClient.classify(input);
        return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    });

    // 8. Get Help
    server.registerTool("get_help", {
        title: "Get Jina AI API Help",
        description: "Returns the full content of the jina-docs.md documentation.",
        inputSchema: {},
    }, async () => {
        try {
            const docPath = path.resolve(__dirname, '../../jina-docs.md');
            const content = await fs.readFile(docPath, 'utf-8');
            return { content: [{ type: "text", text: content }] };
        } catch (error) {
            console.error("Error reading help file:", error);
            return { content: [{ type: "text", text: "Error: Could not load the help documentation." }] };
        }
    });
} 