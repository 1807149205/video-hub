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
const TokenUtil_1 = __importDefault(require("../utils/TokenUtil"));
const VideoDao_1 = __importDefault(require("../dao/VideoDao"));
const VideoTagRelation_1 = __importDefault(require("../dao/VideoTagRelation"));
const VideoTagDao_1 = __importDefault(require("../dao/VideoTagDao"));
const router = express_1.default.Router();
const videoDao = new VideoDao_1.default();
const videoTagDao = new VideoTagDao_1.default();
const videoTagRelationDao = new VideoTagRelation_1.default();
router.post('/save', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = TokenUtil_1.default.getUser(req.headers['token']);
    const reqDTO = req.body;
    const video = yield videoDao.saveVideo(reqDTO, user.id);
    if (video.affectedRows == 1) {
        yield videoTagRelationDao.addRelationBatch(Number.parseInt(video.insertId), reqDTO.selectedTagIds);
        res.send(resp_1.default.ok());
    }
    else {
        res.send(resp_1.default.fail("添加失败"));
    }
}));
router.get('/homePage', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number.parseInt(req.query.page);
    const size = Number.parseInt(req.query.size);
    const videos = yield videoDao.videoHomePage(page, size);
    const vos = [];
    for (const video of videos) {
        const tag = yield videoTagDao.getByVideoId(video.id);
        const tagNames = tag.map(t => t.tagName);
        video.imgUrl = video.videoUrl.replace(/(\.mp4)$/, '_0.png');
        vos.push({
            video,
            tagNames
        });
    }
    res.send(resp_1.default.ok(vos));
}));
router.get('/getById', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number.parseInt(req.query.videoId);
    const video = yield videoDao.getById(id);
    const tag = yield videoTagDao.getByVideoId(video.id);
    const tagNames = tag.map(t => t.tagName);
    res.send(resp_1.default.ok({
        video,
        tagNames
    }));
}));
router.get('/getCurrentUserVideo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = TokenUtil_1.default.getUser(req.headers['token']);
    const videos = yield videoDao.getByUserId(user.id);
    res.send(resp_1.default.ok(videos));
}));
exports.default = router;
