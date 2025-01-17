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
const express_1 = __importDefault(require("express"));
const resp_1 = __importDefault(require("../utils/resp"));
const UserDao_1 = __importDefault(require("../dao/UserDao"));
const router = express_1.default.Router();
const userDao = new UserDao_1.default();
router.post(`/login`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.json(resp_1.default.fail("请输入用户名或密码"));
    }
    const user = yield userDao.getUserByUsernameAndPassword(username, password);
    if (user) {
        res.json(resp_1.default.ok(user));
    }
    else {
        res.json(resp_1.default.fail("用户名或密码错误"));
    }
}));
router.get(`/getAll`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUser = yield userDao.getAll();
    res.json(resp_1.default.ok(allUser));
}));
router.post(`/save`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = req.body;
    yield userDao.saveUser(userInfo);
    res.json(resp_1.default.ok());
}));
exports.default = router;
