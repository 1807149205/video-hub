import express from 'express';
import { Request, Response } from 'express';
import Resp from '../utils/resp';
import VideoTagDao from "../dao/VideoTagDao";
import tokenUtil from "../utils/TokenUtil";
import {UserType} from "../dao/UserDao";

const router = express.Router();

const videoTagDao = new VideoTagDao();

router.get('/getAllTag', async (req, res) => {
    const result = await videoTagDao.getTreeAll();

    res.send(Resp.ok(result));
})

router.post('/saveTag', async (req: Request, res: Response) => {
    const { tagName, pId } = req.body;
    const user = tokenUtil.getUser(req.headers['token'] as string) as UserType;
    try {
        await videoTagDao.saveTag(tagName, pId, user.id);
        res.send(Resp.ok());
    } catch (_) {
        res.send(Resp.fail("标签已存在"));
    }
})

export default router;