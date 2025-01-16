import express from 'express';
import { Request, Response } from 'express';
import Resp from '../utils/resp';
import UserDao from '../dao/UserDao';

const router = express.Router();

const userDao = new UserDao();

router.post(`/login`, async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.json(Resp.fail("请输入用户名或密码"));
    }
    const user = await userDao.getUserByUsernameAndPassword(username, password);
    if (user) {
        res.json(Resp.ok(user));
    } else {
        res.json(Resp.fail("用户名或密码错误"));
    }
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