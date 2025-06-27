import "dotenv/config";
import { createServer } from "./server";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

async function main() {
    // Retrieve the Jina AI API key from environment variables.
    const apiKey = process.env.JINA_API_KEY;
    if (!apiKey) {
        console.error("JINA_API_KEY environment variable is not set.");
        process.exit(1);
    }

    // Create the MCP server instance, which will have all tools registered.
    const server = createServer(apiKey);

    // Create a transport that uses stdin/stdout for communication.
    const transport = new StdioServerTransport();

    // Connect the server to the transport and start listening.
    try {
        await server.connect(transport);
        console.log("Jina AI MCP Server connected via stdio.");
    } catch (error) {
        console.error("Failed to connect the server:", error);
        process.exit(1);
    }
}

main(); 