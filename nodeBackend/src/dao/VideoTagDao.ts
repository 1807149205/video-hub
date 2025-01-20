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
        console.log(tagMenuMap, 'tagMenuMap');

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
        console.log(result,'result');
        return result;
    }
}

export default VideoTagDao;