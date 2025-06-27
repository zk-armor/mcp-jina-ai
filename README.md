# Jina AI MCP Server

[![PyPI version](https://badge.fury.io/py/jina-ai-mcp-server.svg)](https://badge.fury.io/py/jina-ai-mcp-server)

This project provides a Model Context Protocol (MCP) server that exposes the Jina AI Search Foundation APIs as a suite of tools for Large Language Models (LLMs). It allows AI agents and applications to easily leverage Jina's powerful search, reranking, and content-reading capabilities.

This server is built using `mcp.py` (specifically the `FastMCP` framework) and is designed to be lightweight, fast, and easy to deploy.

## 🔌 Connecting with MCP Clients

To use this server with an MCP client (like the Claude extension), you need to add its configuration to your `mcpServers.json` file. The recommended way is to run the server directly from PyPI using `uvx`.

First, get your free API key from [jina.ai](https://jina.ai/?sui=apikey).

Then, add the following configuration, inserting your API key:

```json
{
  "mcpServers": {
    "jina-ai": {
      "command": "uvx",
      "args": [
        "jina-ai-mcp-server"
      ],
      "env": {
        "JINA_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

For alternative run methods, see the sections below.

## Features

The server exposes the following Jina AI APIs as MCP tools:

-   **Embeddings**: `jina_embeddings` - Convert text/images to vectors.
-   **Reranker**: `jina_rerank` - Refine search results for relevance.
-   **Reader**: `jina_reader` - Extract LLM-friendly content from URLs.
-   **Search**: `jina_search` - Perform web searches optimized for LLMs.
-   **DeepSearch**: `jina_deepsearch` - Combine search, reading, and reasoning.
-   **Segmenter**: `jina_segmenter` - Tokenize and chunk text.
-   **Text Classifier**: `jina_classify_text` - Classify text with zero-shot models.
-   **Image Classifier**: `jina_classify_image` - Classify images with zero-shot models.

## 🚀 Advanced: Running the Server Manually

If you prefer not to use the `mcpServers.json` configuration, you can run the server manually.

### Configuration

Before running the server, you must set the `JINA_API_KEY` environment variable.

```bash
export JINA_API_KEY="your_api_key_here"
```

### Using Docker

A Dockerfile is provided for containerized deployments.

1.  **Build the Docker Image**:
    ```bash
    docker build -t jina-ai-mcp-server .
    ```

2.  **Run the Docker Container**:
    ```bash
    docker run -e JINA_API_KEY="your_api_key_here" --rm -it jina-ai-mcp-server
    ```

### From Source

If you have cloned the repository, you can run it locally.

1.  **Install Dependencies**:
    ```bash
    # Using uv
    uv venv
    source .venv/bin/activate
    uv pip install -e .
    ```

2.  **Run the Server**:
    ```bash
    python -m jina_ai_mcp_server.main
    ```

## 📦 Publishing (For Developers)

To publish a new version to PyPI:

1.  **Install build tools**:
    ```bash
    pip install build twine
    ```
2.  **Build the package**:
    ```bash
    python -m build
    ```
3.  **Upload to PyPI**:
    ```bash
    twine upload dist/*
    ``` 