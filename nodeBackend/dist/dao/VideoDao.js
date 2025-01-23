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
class VideoDao {
    convertType(video) {
        return {
            id: video.id,
            videoName: video.video_name,
            videoDesc: video.video_desc,
            videoUrl: video.video_url,
            createUserId: video.create_user_id,
            createDate: video.create_date,
            updateDate: video.update_date,
        };
    }
    saveVideo(video, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
            INSERT INTO video(video_name, video_desc, video_url, create_user_id, create_date)
            VALUES (?,?,?,?,?)
        `;
            return yield DatabaseUtil_1.default.update(sql, [
                video.videoName, video.videoDesc, video.videoUrl, userId, new Date()
            ]);
        });
    }
    videoHomePage(page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
            SELECT * FROM video ORDER BY create_date DESC LIMIT ?,?
        `;
            const videos = yield DatabaseUtil_1.default.select(sql, [(page - 1) * size, size]);
            return videos.map(video => this.convertType(video));
        });
    }
    getById(videoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
            SELECT * FROM video WHERE id = ?
        `;
            const video = yield DatabaseUtil_1.default.select(sql, [videoId]);
            return this.convertType(video[0]);
        });
    }
}
exports.default = VideoDao;
