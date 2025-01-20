import express from 'express';
import { Request, Response } from 'express';
import Resp from '../utils/resp';
import VideoTagDao from "../dao/VideoTagDao";

const router = express.Router();

const videoTagDao = new VideoTagDao();

router.get('/getAllTag', async (req, res) => {
    const result = await videoTagDao.getTreeAll();

    res.send(Resp.ok(result));
})

export default router;