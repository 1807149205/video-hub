class Resp<T> {

    private data: T | null = null;
    private msg: string = "success";
    private code: string = "200";

    constructor(data?: T, msg?: string, code?: string) {
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

    static ok<T>(data?: T) {
        return new Resp(data);
    }

    static fail(msg?: string) {
        return new Resp(null, msg);
    }

}

export default Resp;