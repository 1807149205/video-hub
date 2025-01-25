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
class VideoTagDao {
    rowTypeToDTO(rowType) {
        return {
            id: rowType.id,
            pId: rowType.p_id,
            tagName: rowType.tag_name,
            createUserId: rowType.create_user_id,
            createDate: rowType.create_date,
            updateDate: rowType.update_date,
        };
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT * FROM video_tag`;
            const res = yield DatabaseUtil_1.default.select(sql);
            return res.map(row => this.rowTypeToDTO(row));
        });
    }
    getTreeAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const allTag = yield this.getAll();
            const tagMenuMap = new Map();
            for (const tag of allTag) {
                if (tagMenuMap.has(tag.pId)) {
                    const tags = tagMenuMap.get(tag.pId);
                    tags.push(tag);
                    tagMenuMap.set(tag.pId, tags);
                }
                else {
                    const tags = [];
                    tags.push(tag);
                    tagMenuMap.set(tag.pId, tags);
                }
            }
            let result = [];
            for (const tag of allTag) {
                if (tag.pId === -1) {
                    result.push(tag);
                }
            }
            for (const resultTag of result) {
                const tags = tagMenuMap.get(resultTag.id) || [];
                resultTag.children = [];
                for (const tag of tags) {
                    resultTag.children.push(tag);
                }
            }
            return result;
        });
    }
    getByVideoId(videoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
            SELECT * FROM video_tag_relation 
                LEFT JOIN video_tag ON video_tag_relation.tag_id = video_tag.id
            WHERE video_tag_relation.video_id = ?
        `;
            const res = yield DatabaseUtil_1.default.select(sql, [videoId]);
            return res.map(row => this.rowTypeToDTO(row));
        });
    }
    saveTag(tagName, pId, createUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `
            INSERT INTO video_tag(tag_name, p_id, create_user_id, create_date)
            VALUES (?,?,?,?)
        `;
            const countSql = `
            SELECT COUNT(*) FROM video_tag WHERE tag_name = ? AND p_id = ?
        `;
            const count = yield DatabaseUtil_1.default.select(countSql, [tagName, pId]);
            if (count[0]['COUNT(*)'] > 0) {
                throw new Error("标签已存在");
            }
            else {
                yield DatabaseUtil_1.default.update(sql, [tagName, pId, createUserId, new Date()]);
            }
        });
    }
}
exports.default = VideoTagDao;
