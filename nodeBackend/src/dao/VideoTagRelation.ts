import DatabaseUtil from "../utils/DatabaseUtil";

class VideoTagRelation {
    async addRelation(videoId: number, tagId: number) {
        const sql = `
            INSERT INTO video_tag_relation(video_id, tag_id) VALUES (?,?)
        `;
        return await DatabaseUtil.update(sql, [videoId, tagId]);
    }
    async addRelationBatch(videoId: number, tagIds: number[]) {
        tagIds.forEach((tagId) => {
            this.addRelation(videoId, tagId);
        })
    }
}

export default VideoTagRelation;