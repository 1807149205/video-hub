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
class VideoTagRelation {
    addRelation(videoId, tagId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
            INSERT INTO video_tag_relation(video_id, tag_id) VALUES (?,?)
        `;
            return yield DatabaseUtil_1.default.update(sql, [videoId, tagId]);
        });
    }
    addRelationBatch(videoId, tagIds) {
        return __awaiter(this, void 0, void 0, function* () {
            tagIds.forEach((tagId) => {
                this.addRelation(videoId, tagId);
            });
        });
    }
}
exports.default = VideoTagRelation;
