"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = require("node:crypto");
class TokenUtil {
    static getToken(user) {
        const token = this.genToken();
        this.userMap.set(token, user);
        return token;
    }
    static genToken() {
        return (0, node_crypto_1.randomUUID)();
    }
    static getUser(token) {
        return this.userMap.get(token);
    }
    static getCurrentUser(req) {
        // @ts-ignore
        const token = req.headers["token"];
        return this.getUser(token);
    }
}
TokenUtil.userMap = new Map();
exports.default = TokenUtil;
