"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
class DatabaseUtil {
    /**
     * 执行 SELECT 查询
     * @param sql - SQL 查询语句
     * @param params - SQL 参数（可选）
     * @returns 查询结果
     */
    static select(sql, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield db_1.default.query(sql, params);
                return rows;
            }
            catch (error) {
                console.error('Error executing SELECT query:', error);
                throw error;
            }
        });
    }
    /**
     * 执行 UPDATE 查询
     * @param sql - SQL 查询语句
     * @param params - SQL 参数（可选）
     * @returns 受影响的行数
     */
    static update(sql, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [result] = yield db_1.default.query(sql, params);
                return result;
            }
            catch (error) {
                console.error('Error executing UPDATE query:', error);
                throw error;
            }
        });
    }
    /**
     * 执行 DELETE 查询
     * @param sql - SQL 查询语句
     * @param params - SQL 参数（可选）
     * @returns 受影响的行数
     */
    static delete(sql, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [result] = yield db_1.default.query(sql, params);
                return result.affectedRows;
            }
            catch (error) {
                console.error('Error executing DELETE query:', error);
                throw error;
            }
        });
    }
}
exports.default = DatabaseUtil;
