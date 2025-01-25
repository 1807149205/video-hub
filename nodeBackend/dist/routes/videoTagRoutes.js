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
const VideoTagDao_1 = __importDefault(require("../dao/VideoTagDao"));
const TokenUtil_1 = __importDefault(require("../utils/TokenUtil"));
const router = express_1.default.Router();
const videoTagDao = new VideoTagDao_1.default();
router.get('/getAllTag', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield videoTagDao.getTreeAll();
    res.send(resp_1.default.ok(result));
}));
router.post('/saveTag', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tagName, pId } = req.body;
    const user = TokenUtil_1.default.getUser(req.headers['token']);
    try {
        yield videoTagDao.saveTag(tagName, pId, user.id);
        res.send(resp_1.default.ok());
    }
    catch (_) {
        res.send(resp_1.default.fail("标签已存在"));
    }
}));
exports.default = router;
