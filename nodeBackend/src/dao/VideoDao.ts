import DatabaseUtil from "../utils/DatabaseUtil";

export interface VideoType {
    id: number;
    videoName: string;
    videoDesc: string;
    videoUrl: string;
    createUserId: number;
    createDate: Date;
    updateDate: Date;
    imgUrl?: string;
}

export interface VideoRawType {
    id: number;
    video_name: string;
    video_desc: string;
    video_url: string;
    create_user_id: number;
    create_date: Date;
    update_date: Date;
}

class VideoDao {

    private convertType(video: VideoRawType): VideoType {
        return {
            id: video.id,
            videoName: video.video_name,
            videoDesc: video.video_desc,
            videoUrl: video.video_url,
            createUserId: video.create_user_id,
            createDate: video.create_date,
            updateDate: video.update_date,
        }
    }
    async saveVideo(video: VideoType, userId: number) {
        const sql = `
            INSERT INTO video(video_name, video_desc, video_url, create_user_id, create_date)
            VALUES (?,?,?,?,?)
        `;
        return await DatabaseUtil.update(sql, [
            video.videoName, video.videoDesc, video.videoUrl, userId, new Date()
        ])
    }
    async videoHomePage(page: number, size: number) {
        const sql = `
            SELECT * FROM video ORDER BY create_date DESC LIMIT ?,?
        `;
        const videos = await DatabaseUtil.select(sql, [(page - 1) * size, size]);
        return videos.map(video => this.convertType(video));
    }
    async getById(videoId: number) {
        const sql = `
            SELECT * FROM video WHERE id = ?
        `;
        const video = await DatabaseUtil.select(sql, [videoId]);
        return this.convertType(video[0]);
    }

    async getByUserId(id: number) {
        const sql = `
            SELECT * FROM video WHERE create_user_id = ?
        `;
        const videos = await DatabaseUtil.select(sql, [id]);
        return videos.map(video => this.convertType(video));
    }
}

export default VideoDao;