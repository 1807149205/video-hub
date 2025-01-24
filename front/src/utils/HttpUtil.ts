import axios, { type AxiosRequestConfig } from "axios";
import {showNotify} from "vant";

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
        try {
            const resp = await axios.get(`${this.baseUrl}${url}`, {
                params,
                ...this.config
            })
            const commonResp: CommonResponse<any> = resp.data;
            return commonResp;
        } catch (e) {
            showNotify({
                message: '网络错误',
                type: 'danger'
            })
            throw e;
        }
    }

    static async post(url: string, data?: any, headers?: any) {
        try {
            let resp;
            if (headers) {
                resp = await axios.post(`${this.baseUrl}${url}`, data, {
                    headers
                })
            } else {
                resp = await axios.post(`${this.baseUrl}${url}`, data, this.config);
            }
            const commonResp: CommonResponse<any> = resp.data;
            return commonResp;
        } catch (e) {
            showNotify({
                message: '网络错误',
                type: 'danger'
            })
            throw e;
        }
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