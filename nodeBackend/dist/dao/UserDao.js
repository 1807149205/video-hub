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
const DatabaseUtil_1 = __importDefault(require("../utils/DatabaseUtil"));
class UserDao {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield DatabaseUtil_1.default.select("select * from user");
            return res;
        });
    }
    saveUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO `video_hub`.`user` (`username`, `password`, `avatar`, `create_date`) VALUES (?,?,?,?)";
            yield DatabaseUtil_1.default.update(sql, [user.username, user.password, user.avatar || "", new Date()]);
        });
    }
    getUserByUsernameAndPassword(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM user WHERE username = ? AND password = ?";
            return yield DatabaseUtil_1.default.select(sql, [username, password]);
        });
    }
}
exports.default = UserDao;
