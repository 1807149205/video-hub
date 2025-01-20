import express from 'express';
import { Request, Response } from 'express';
import Resp from '../utils/resp';
import UserDao, { UserType } from '../dao/UserDao';
import tokenUtil from "../utils/TokenUtil";

const router = express.Router();

const userDao = new UserDao();

router.post(`/login`, async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.json(Resp.fail("请输入用户名或密码"));
    }
    const user: UserType[] = await userDao.getUserByUsernameAndPassword(username, password);
    if (user.length === 0) {
        res.json(Resp.fail("用户名或密码错误"));
        return;
    }
    res.json(Resp.ok(tokenUtil.getToken(user[0])));
})

router.get('/getCurrentUser', async (req: Request, res: Response) => {
    const token = req.headers['token'];
    if (!token) {
        res.json(Resp.fail("请先登录"));
    } else {
        const user = tokenUtil.getUser(token as string);
        if (user) {
            user.password = '***';
            res.json(Resp.ok(user));
        } else {
            res.json(Resp.fail("请先登录"));
        }
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