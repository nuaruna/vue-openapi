import axios, { AxiosInstance } from 'axios';

class Api {
  private http!: AxiosInstance;
  constructor(baseUrl?: string) {
    this.initHttp(baseUrl);
  }

  private initHttp(baseUrl?: string): void {
    this.http = axios.create({
      baseURL: baseUrl,
      withCredentials: true,
    });
  }

  public async get(url: string, params: any = {}): Promise<any> {
    const reply = await this.http.get(url, {
      params: {
        ...params,
      },
    });

    if (!reply.data) {
      throw new Error('No Reply Data');
    }

    return reply.data;
  }

  public async post(url: string, data: any, params: any): Promise<any> {
    const reply = await this.http.post(url, data, {
      params,
    });

    if (!reply.data) {
      throw new Error('No Reply Data');
    }

    return reply.data;
  }
}

export const api = new Api();
