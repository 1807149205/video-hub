import express from 'express';
import { Request, Response } from 'express';
import Resp from '../utils/resp';
import UserDao from '../dao/UserDao';

const router = express.Router();

const userDao = new UserDao();

router.get(`/login`, async (req: Request, res: Response) => {
    res.json(new Resp({
        "userId": "123"
    }));
})

router.get(`/getAll`, async (req: Request, res: Response) => {
    const allUser = await userDao.getAll();
    res.json(Resp.ok(allUser))
})

router.post(`/save`, async (req: Request, res: Response) => {
    const userInfo = req.body;
    await userDao.saveUser(userInfo);
    res.json(Resp.ok());
})

export default router;