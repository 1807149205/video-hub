import express from 'express';
import { Request, Response } from 'express';
import Resp from '../utils/resp';
import * as fs from "node:fs";
import multer from 'multer';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { Client } from 'minio';

dotenv.config();

const uploadPath = process.env.VIDEO_SAVE_PATH;
const videoUrlPrefix = process.env.VIDEO_URL_PREFIX;

const uploadDesc = 'uploads/';

const router = express.Router();
const upload = multer({
    dest: uploadDesc,
    limits: { fileSize: 300 * 1024 * 1024 }//300MB
});

const minioClient = new Client({
    endPoint: process.env.MINIO_ENDPOINT || 'http://127.0.0.1:9000',
    port: parseInt(process.env.MINIO_PORT || '9000'),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
});

const bucketName = process.env.MINIO_BUCKET_NAME || "";

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
        const filePath = path.join(`${uploadPath}`, `${file.filename}.${file.originalname.split(".")[1]}`);
        const dir = path.dirname(filePath);

        // 检查并创建目录
        fs.mkdir(dir, { recursive: true }, async (err) => {
            if (err) {
                res.send(Resp.fail('Failed to create directory'));
                return;
            }

            console.log('上传文件的地址:', filePath);
            const minioResp = await minioClient.fPutObject(bucketName, `${file.filename}.${file.originalname.split(".")[1]}`, file.path);
            console.log('minioResp', minioResp);
            const videoUrl = `${process.env.MINIO_URL_PREFIX}/${bucketName}/${file.filename}.${file.originalname.split(".")[1]}`;
            // 删除临时文件
            fs.unlink(file.path, (err) => {
                if (err) {
                    console.error('Failed to delete temporary file', err);
                } else {
                    console.log('Temporary file deleted');
                }
            });
            res.send(Resp.ok(videoUrl));
        });
    });
});

export default router;