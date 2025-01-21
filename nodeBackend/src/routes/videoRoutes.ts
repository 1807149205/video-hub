import express from 'express';
import { Request, Response } from 'express';
import Resp from '../utils/resp';
import tokenUtil from "../utils/TokenUtil";
import {UserType} from "../dao/UserDao";
import VideoDao, {VideoType} from "../dao/VideoDao";
import VideoTagRelation from "../dao/VideoTagRelation";
import VideoTagDao from '../dao/VideoTagDao';

const router = express.Router();

interface SaveReqDTO extends VideoType {
    selectedTagIds: []
}

const videoDao = new VideoDao();
const videoTagDao = new VideoTagDao();
const videoTagRelationDao = new VideoTagRelation();

router.post('/save', async (req: Request, res: Response) => {
    const user = tokenUtil.getUser(req.headers['token'] as string) as UserType;
    const reqDTO = req.body as SaveReqDTO;
    const video = await videoDao.saveVideo(reqDTO, user.id);
    if (video.affectedRows == 1) {
        await videoTagRelationDao.addRelationBatch(Number.parseInt(video.insertId), reqDTO.selectedTagIds);
        res.send(Resp.ok());
    } else {
        res.send(Resp.fail("添加失败"));
    }
})

interface PageVo {
    video: VideoType,
    tagNames: string[]
}
router.get('/homePage', async (req: Request, res: Response) => {
    const page = Number.parseInt(req.query.page as string);
    const size = Number.parseInt(req.query.size as string);
    const videos = await videoDao.videoHomePage(page, size);
    const vos: PageVo[] = [];

    for (const video of videos) {
        const tag = await videoTagDao.getByVideoId(video.id);
        const tagNames = tag.map(t => t.tagName);
        vos.push({
            video,
            tagNames
        })
    }
    res.send(Resp.ok(vos));
})

export default router;