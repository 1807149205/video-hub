import DatabaseUtil from "../utils/DatabaseUtil";

export interface VideoTagType {
    id: number;
    pId: number;
    tagName: string;
    createUserId: number;
    createDate: Date;
    updateDate: Date
}

export interface VideoTagTree extends VideoTagType{
    children: VideoTagType[];
}

interface VideoTagRowType {
    id: number;
    p_id: number;
    tag_name: string;
    create_user_id: number;
    create_date: Date;
    update_date: Date;
}

class VideoTagDao {
    private rowTypeToDTO(rowType: VideoTagRowType): VideoTagType {
        return {
            id: rowType.id,
            pId: rowType.p_id,
            tagName: rowType.tag_name,
            createUserId: rowType.create_user_id,
            createDate: rowType.create_date,
            updateDate: rowType.update_date,
        }
    }
    async getAll() {
        const sql = `SELECT * FROM video_tag`;
        const res: VideoTagRowType[] = await DatabaseUtil.select(sql);
        return res.map(row => this.rowTypeToDTO(row));
    }
    async getTreeAll() {
        const allTag = await this.getAll();
        const tagMenuMap: Map<number, VideoTagType[]> = new Map();
        for (const tag of allTag) {
            if (tagMenuMap.has(tag.pId)) {
                const tags = tagMenuMap.get(tag.pId) as VideoTagType[];
                tags.push(tag);
                tagMenuMap.set(tag.pId, tags);
            } else {
                const tags: VideoTagType[] = [];
                tags.push(tag);
                tagMenuMap.set(tag.pId, tags);
            }
        }
        let result: VideoTagTree[] = [];
        for (const tag of allTag) {
            if (tag.pId === -1) {
                result.push(<VideoTagTree>tag);
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
    }
    async getByVideoId(videoId: number): Promise<VideoTagType[]> {
        const sql = `
            SELECT * FROM video_tag_relation 
                LEFT JOIN video_tag ON video_tag_relation.tag_id = video_tag.id
            WHERE video_tag_relation.video_id = ?
        `;
        const res: VideoTagRowType[] = await DatabaseUtil.select(sql, [videoId]);
        return res.map(row => this.rowTypeToDTO(row));
    }

    async saveTag(tagName: string, pId: string, createUserId: number) {
        const sql = `
            INSERT INTO video_tag(tag_name, p_id, create_user_id, create_date)
            VALUES (?,?,?,?)
        `;
        const countSql = `
            SELECT COUNT(*) FROM video_tag WHERE tag_name = ? AND p_id = ?
        `
        const count = await DatabaseUtil.select(countSql, [tagName, pId]);
        if (count[0]['COUNT(*)'] > 0) {
            throw new Error("标签已存在");
        } else {
            await DatabaseUtil.update(sql, [tagName, pId, createUserId, new Date()]);
        }
    }
}

export default VideoTagDao;