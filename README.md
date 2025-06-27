# Jina AI MCP Server (Node.js Version)

[![NPM version](https://badge.fury.io/js/jina-ai-mcp-server-nodejs.svg)](https://badge.fury.io/js/jina-ai-mcp-server-nodejs)

An MCP server for Jina AI, providing tools for embeddings, reranking, and generation. This is the Node.js version.

## Available Tools

This server provides the following tools, which are direct interfaces to the Jina AI Search Foundation APIs:

-   **`embeddings`**: Creates an embedding vector representing the input text.
-   **`rerank`**: Reranks a list of documents based on a query.
-   **`read`**: Extracts clean, LLM-friendly content from a single website URL.
-   **`search`**: Performs a web search and returns LLM-friendly results.
-   **`deepsearch`**: Combines web searching, reading, and reasoning for comprehensive investigation.
-   **`segment`**: Splits text into semantic chunks or counts tokens.
-   **`classify`**: Performs zero-shot classification for text.
-   **`get_help`**: Returns the full Jina AI API documentation used to build this server.

## Connecting with MCP Clients

To connect this server to your MCP-compatible client (like Cursor, shell-ai, etc.), you first need to publish this package to NPM or install it from a local path.

### Using with `npx` (After Publishing)

Once the package is published on NPM, you can configure your client to use it with `npx`. Create a `.env` file with your `JINA_API_KEY` in the directory where you run the client, or make sure the environment variable is set.

Example for `mcpServers.json`:

```json
{
  "jina-ai-server": {
    "command": "npx",
    "args": [
      "jina-ai-mcp-server-nodejs"
    ],
    "env": {
      "JINA_API_KEY": "your_jina_api_key_here"
    }
  }
}
```

**Note:** Passing the API key via `env` in the configuration is more secure than a global environment variable.

## Local Development

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root of the project and add your Jina AI API key.
    ```bash
    echo "JINA_API_KEY=your_jina_ai_api_key_here" > .env
    ```
4.  Run the server in development mode:
    ```bash
    npm run dev
    ```

## Docker

## Building for Production

To compile the TypeScript code to JavaScript:

```sh
npm run build
```
The compiled output will be in the `dist` directory.

You can then run the compiled code with:
```sh
npm start
``` 