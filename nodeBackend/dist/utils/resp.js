"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Resp {
    constructor(data, msg, code) {
        this.data = null;
        this.msg = "success";
        this.code = "200";
        if (data) {
            this.data = data;
        }
        if (msg) {
            this.msg = msg;
        }
        if (code) {
            this.code = code;
        }
    }
    static ok(data) {
        return new Resp(data);
    }
    static fail(msg) {
        return new Resp(null, msg, "400");
    }
}
exports.default = Resp;
