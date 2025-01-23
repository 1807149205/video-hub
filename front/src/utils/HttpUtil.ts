import axios, { type AxiosRequestConfig } from "axios";

interface CommonResponse<T> {
    data: T;
    code: string;
    msg: string;
}

class HttpUtil {

    private static baseUrl: string;
    private static config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'token': ''
        }
    }

    static async get(url: string, params?: any) {
        const resp = await axios.get(`${this.baseUrl}${url}`, {
            params,
            ...this.config
        })
        const commonResp: CommonResponse<any> = resp.data;
        return commonResp;
    }

    static async post(url: string, data?: any) {
        const resp = await axios.post(`${this.baseUrl}${url}`, data, this.config);
        const commonResp: CommonResponse<any> = resp.data;
        return commonResp;
    }

    static async upload(url: string, data?: any) {
        const resp = await axios.post(`${this.baseUrl}${url}`, data, {
            headers: {
                'token': this.config.headers['token'],
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        });
        const commonResp: CommonResponse<any> = resp.data;
        return commonResp;
    }

    static async setBaseUrl(url: string) {
        this.baseUrl = url;
    }

    static async getBaseUrl() {
        return this.baseUrl;
    }

    static async addToken(token: string) {
        this.config.headers['token'] = token;
    }
}

export default HttpUtil;