# Jina AI MCP Server (Node.js Version)

[![NPM version](https://badge.fury.io/js/jina-ai-mcp-server-nodejs.svg)](https://badge.fury.io/js/jina-ai-mcp-server-nodejs)

An MCP server for Jina AI, providing tools for embeddings, reranking, and generation. This is the Node.js version.

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

## Features

This server exposes the following tools from the Jina AI API:

-   **`embeddings`**: Creates an embedding vector representing the input text.
-   **`rerank`**: Reranks a list of documents based on a query.
-   **`generate`**: Generates a response from a chat model (Completions API).

## Development

### Prerequisites

-   Node.js (v16 or higher)
-   npm

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/zk-armor/mcp-jina-ai.git
    cd mcp-jina-ai
    git checkout nodejs
    ```

2.  Install dependencies:
    ```sh
    npm install
    ```

3.  Set up your environment variables. Create a `.env` file in the root of the project:
    ```sh
    cp .env.example .env
    ```
    Now, edit the `.env` file and add your Jina AI API key:
    ```
    JINA_API_KEY=your_super_secret_api_key
    ```

### Running in Development Mode

To run the server in development mode with hot-reloading:

```sh
npm run dev
```

The server will start, and you can connect to it from a local MCP client for testing.

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