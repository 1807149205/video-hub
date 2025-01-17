import axios, { type AxiosRequestConfig } from "axios";

class HttpUtil {

    private static baseUrl: string;
    private static config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    static async get(url: string, params?: any) {
        const resp = await axios.get(`${this.baseUrl}${url}`, {
            params,
            ...this.config
        })
        return resp;
    }

    static async post(url: string, data?: any) {
        const resp = await axios.post(`${this.baseUrl}${url}`, data, this.config);
        return resp;
    }

    static async setBaseUrl(url: string) {
        this.baseUrl = url;
    }

    static async getBaseUrl() {
        return this.baseUrl;
    }
}

export default HttpUtil;