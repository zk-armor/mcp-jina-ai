import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

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
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
                'Accept-Encoding': 'identity', // Required to avoid compressed responses
                'Accept': 'application/json',
            }
        });
    }

    private async post<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.client.post<T>(url, data, config);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Jina AI API Error:', JSON.stringify(error.response.data, null, 2));
                throw new Error(`Jina AI API Error: ${error.response.status} ${error.response.statusText}`);
            }
            console.error('Unexpected Jina AI API Error:', error);
            throw new Error('An unexpected error occurred with the Jina AI API.');
        }
    }

    public embeddings(data: Record<string, any>) {
        const url = `${this.baseUrl}/embeddings`;
        return this.post(url, data);
    }

    public rerank(data: Record<string, any>) {
        const url = `${this.baseUrl}/rerank`;
        return this.post(url, data);
    }

    public classify(data: Record<string, any>) {
        const url = `${this.baseUrl}/classify`;
        return this.post(url, data);
    }

    public deepsearch(data: Record<string, any>) {
        const url = 'https://deepsearch.jina.ai/v1/chat/completions';
        return this.post(url, data);
    }

    public read(data: Record<string, any>, headers?: Record<string, string>) {
        const readerUrl = 'https://r.jina.ai/';
        return this.post(readerUrl, { url: data.url }, { headers });
    }

    public search(data: Record<string, any>, headers?: Record<string, string>) {
        const searchUrl = 'https://s.jina.ai/';
        return this.post(searchUrl, { q: data.q }, { headers });
    }

    public segment(data: Record<string, any>) {
        const segmentUrl = 'https://segment.jina.ai/';
        return this.post(segmentUrl, data);
    }
} 