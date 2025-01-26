import * as dotenv from "dotenv";
import multer from "multer";
import {Client} from "minio";

dotenv.config();

const uploadPath = process.env.VIDEO_SAVE_PATH;
const videoUrlPrefix = process.env.VIDEO_URL_PREFIX;
const MINIO_URL_PREFIX = process.env.MINIO_URL_PREFIX;

const uploadDesc = 'uploads/';

const minioClient = new Client({
    endPoint: process.env.MINIO_ENDPOINT || 'http://127.0.0.1:9000',
    port: parseInt(process.env.MINIO_PORT || '9000'),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
});
const bucketName = process.env.MINIO_BUCKET_NAME || "";


class FileUploadUtils {
    static async uploadImg(imgPath: string, imgName: string, imgSuffix?: string) {
        if (!imgSuffix) {
            imgSuffix = 'png';
        }
        const minioResp = await minioClient.fPutObject(bucketName, `${imgName}.${imgSuffix}`, imgPath);
        const url = `${MINIO_URL_PREFIX}/${bucketName}/${imgName}.${imgSuffix}`;
        console.log('正在上传图片',url, minioResp)
        return url;
    }
}

export default FileUploadUtils;