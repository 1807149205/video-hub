import express, {Request, Response} from 'express';
import Resp from '../utils/resp';
import * as fs from "node:fs";
import multer from 'multer';
import * as dotenv from 'dotenv';
import * as path from 'path';
import {Client} from 'minio';
import FileUploadUtils from "../utils/FileUploadUtils";
import FFmpegUtils from "../utils/FFmpegUtils";

dotenv.config();

const uploadPath = process.env.VIDEO_SAVE_PATH;
const videoUrlPrefix = process.env.VIDEO_URL_PREFIX;

const uploadDesc = 'uploads/';

const router = express.Router();
const upload = multer({
    dest: uploadPath,
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

interface UploadResp {
    videoUrl: string
    imgUrls: string[]
}

router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
    const resp: UploadResp = {
        videoUrl: '',
        imgUrls: []
    };

    const file = req.file;
    console.log(file, 'upload');
    if (!file) {
        res.send(Resp.fail('No file uploaded'));
        return;
    }

    fs.readFileSync(file.path);

    const filePath = path.join(`${uploadPath}`, `${file.filename}.${file.originalname.split(".")[1]}`);
    const dir = path.dirname(filePath);
    fs.mkdirSync(dir, { recursive: true });

    console.log('上传文件的地址:', filePath);

    const minioResp = await minioClient.fPutObject(bucketName, `${file.filename}.${file.originalname.split(".")[1]}`, file.path);
    console.log('minioResp', minioResp);

    resp.videoUrl = `${process.env.MINIO_URL_PREFIX}/${bucketName}/${file.filename}.${file.originalname.split(".")[1]}`;
    res.send(Resp.ok(resp.videoUrl));
    const imgChunkNum = 10;
    FFmpegUtils.extractImagesFromVideo(file.path, imgChunkNum).then(async (result) => {
        console.log(result);
        for (const [index, imgPath] of result.entries()) {
            const imgSuffix = path.extname(imgPath).replace(".", "");
            const imgUrl = await FileUploadUtils.uploadImg(imgPath, file.filename + "_" + index, imgSuffix);
            resp.imgUrls.push(imgUrl);
        }

    }).finally(() => {
        fs.rm(file.path, { recursive: true, force: true }, (err) => {
            if (err) {
                console.error('删除文件夹时出错:', err);
            } else {
                console.log('删除临时文件夹');
            }
        });
        fs.rm(path.join(path.dirname(file.path), FFmpegUtils.imgChunkFilePath), { recursive: true, force: true }, (err) => {
            if (err) {
                console.error('删除文件夹时出错:', err);
            } else {
                console.log('删除临时文件夹');
            }
        });
    });

});

export default router;