import express from 'express';
import { Request, Response } from 'express';
import Resp from '../utils/resp';

const router = express.Router();

router.get(`/login`, async (req: Request, res: Response) => {
    res.json(new Resp({
        "userId": "123"
    }));
})

export default router;