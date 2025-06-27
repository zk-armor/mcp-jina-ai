import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { JinaAIAPIClient } from "./client";
import { registerAllTools } from "./tools";

// We create the server in a function so we can pass in the API key.
export function createServer(apiKey: string): McpServer {
    
    const server = new McpServer({
        name: "jina-ai-server",
        version: "0.2.0",
    });

    // Create a single client instance.
    const jinaClient = new JinaAIAPIClient(apiKey);

    // Register all tools, passing them the server instance and the client
    // so the tool handlers can access the client via a closure.
    registerAllTools(server, jinaClient);

    return server;
} 