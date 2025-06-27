import axios, { AxiosInstance } from 'axios';

export class JinaAIAPIClient {
    private readonly client: AxiosInstance;
    private readonly apiKey: string;
    private readonly baseUrl: string = 'https://api.jina.ai/v1';

    constructor(apiKey: string) {
        if (!apiKey) {
            throw new Error('Jina AI API key is required.');
        }
        this.apiKey = apiKey;
        this.client = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
                'Accept-Encoding': 'identity'
            }
        });
    }

    private async post<T>(endpoint: string, data: unknown): Promise<T> {
        try {
            const response = await this.client.post<T>(endpoint, data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(`Error calling Jina AI API at ${endpoint}:`, error.response?.data);
                throw new Error(error.response?.data?.detail || error.message);
            }
            console.error(`Unexpected error calling Jina AI API at ${endpoint}:`, error);
            throw new Error('An unexpected error occurred.');
        }
    }

    public embeddings(input: string | string[], model: string): Promise<any> {
        return this.post('/embeddings', { input, model });
    }

    public rerank(documents: string[], query: string, model: string, top_n?: number): Promise<any> {
        return this.post('/rerank', { documents, query, model, top_n });
    }

    public generate(input: any, model: string, options?: any): Promise<any> {
        return this.post('/chat/completions', {
            messages: [{ role: 'user', content: input }],
            model,
            ...options,
        });
    }
} 