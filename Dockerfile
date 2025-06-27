# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the dependency definitions
COPY pyproject.toml ./

# Install dependencies using uv for speed
# First, install uv itself
RUN pip install uv
# Then, use uv to install the project dependencies
RUN uv pip install --system --no-cache .

# Copy the rest of the application's code
COPY . .

# Environment variable for the Jina AI API key
# This must be provided at runtime using `docker run -e JINA_API_KEY=...`
ENV JINA_API_KEY=""

# The command to run the server when the container starts
CMD ["python", "main.py"] 