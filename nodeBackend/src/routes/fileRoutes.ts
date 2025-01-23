import express from 'express';
import { Request, Response } from 'express';
import Resp from '../utils/resp';
import * as fs from "node:fs";
import multer from 'multer';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

const uploadPath = process.env.VIDEO_SAVE_PATH;
const videoUrlPrefix = process.env.VIDEO_URL_PREFIX;

const router = express.Router();
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 300 * 1024 * 1024 }//300MB
});

router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
    const file = req.file;
    console.log(file, 'upload');
    if (!file) {
        res.send(Resp.fail('No file uploaded'));
        return;
    }
    fs.readFile(file.path, (err, data) => {
        if (err) {
            res.send(Resp.fail('Failed to read file'));
            return;
        }
        const filePath = path.join(`${uploadPath}`,`${file.filename}.${file.originalname.split(".")[1]}`);
        console.log('上传文件的地址:',filePath);
        fs.writeFile(filePath, data, (err) => {
            if (err) {
                res.send(Resp.fail('Failed to write file'));
            } else {
                const videoUrl = `${videoUrlPrefix}/${file.filename}.${file.originalname.split(".")[1]}`;
                res.send(Resp.ok(videoUrl));
            }
        });
    });
});

export default router;