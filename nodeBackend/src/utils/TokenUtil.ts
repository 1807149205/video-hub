import {UserType} from "../dao/UserDao";
import {randomUUID} from "node:crypto";

class TokenUtil {

    private static userMap: Map<string, UserType> = new Map();

    public static getToken(user: UserType): string {
        const token = this.genToken();
        this.userMap.set(token, user);
        return token;
    }

    private static genToken(): string {
        return randomUUID();
    }

    public static getUser(token: string): UserType | undefined {
        return this.userMap.get(token);
    }

    public static getCurrentUser(req: Request): UserType | undefined {
        // @ts-ignore
        const token = req.headers["token"] as string;
        return this.getUser(token);
    }

}

export default TokenUtil;