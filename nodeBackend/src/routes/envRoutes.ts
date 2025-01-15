import express from 'express';
import { Request, Response } from 'express';
import Resp from '../utils/resp';
import * as dotenv from 'dotenv';

dotenv.config();

const mysqlUrl = process.env.MYSQL_URL;
const mysqlUsername = process.env.MYSQL_USERNAME;
const mysqlPassword = process.env.MYSQL_PASSWORD;

const router = express.Router();

router.get(`/getAll`, async (req: Request, res: Response) => {
    res.json(Resp.ok({
        mysqlUrl,
        mysqlUsername,
        mysqlPassword
    }))
})

export default router;