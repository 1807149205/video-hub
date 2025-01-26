"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resp_1 = __importDefault(require("../utils/resp"));
const fs = __importStar(require("node:fs"));
const multer_1 = __importDefault(require("multer"));
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
const minio_1 = require("minio");
const FileUploadUtils_1 = __importDefault(require("../utils/FileUploadUtils"));
const FFmpegUtils_1 = __importDefault(require("../utils/FFmpegUtils"));
dotenv.config();
const uploadPath = process.env.VIDEO_SAVE_PATH;
const videoUrlPrefix = process.env.VIDEO_URL_PREFIX;
const uploadDesc = 'uploads/';
const router = express_1.default.Router();
const upload = (0, multer_1.default)({
    dest: uploadPath,
    limits: { fileSize: 300 * 1024 * 1024 } //300MB
});
const minioClient = new minio_1.Client({
    endPoint: process.env.MINIO_ENDPOINT || 'http://127.0.0.1:9000',
    port: parseInt(process.env.MINIO_PORT || '9000'),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
});
const bucketName = process.env.MINIO_BUCKET_NAME || "";
router.post('/upload', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = {
        videoUrl: '',
        imgUrls: []
    };
    const file = req.file;
    console.log(file, 'upload');
    if (!file) {
        res.send(resp_1.default.fail('No file uploaded'));
        return;
    }
    fs.readFileSync(file.path);
    const filePath = path.join(`${uploadPath}`, `${file.filename}.${file.originalname.split(".")[1]}`);
    const dir = path.dirname(filePath);
    fs.mkdirSync(dir, { recursive: true });
    console.log('上传文件的地址:', filePath);
    const minioResp = yield minioClient.fPutObject(bucketName, `${file.filename}.${file.originalname.split(".")[1]}`, file.path);
    console.log('minioResp', minioResp);
    resp.videoUrl = `${process.env.MINIO_URL_PREFIX}/${bucketName}/${file.filename}.${file.originalname.split(".")[1]}`;
    res.send(resp_1.default.ok(resp.videoUrl));
    const imgChunkNum = 10;
    FFmpegUtils_1.default.extractImagesFromVideo(file.path, imgChunkNum).then((result) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(result);
        for (const [index, imgPath] of result.entries()) {
            const imgSuffix = path.extname(imgPath).replace(".", "");
            const imgUrl = yield FileUploadUtils_1.default.uploadImg(imgPath, file.filename + "_" + index, imgSuffix);
            resp.imgUrls.push(imgUrl);
        }
    })).finally(() => {
        fs.rm(file.path, { recursive: true, force: true }, (err) => {
            if (err) {
                console.error('删除文件夹时出错:', err);
            }
            else {
                console.log('删除临时文件夹');
            }
        });
        fs.rm(path.join(path.dirname(file.path), FFmpegUtils_1.default.imgChunkFilePath), { recursive: true, force: true }, (err) => {
            if (err) {
                console.error('删除文件夹时出错:', err);
            }
            else {
                console.log('删除临时文件夹');
            }
        });
    });
}));
exports.default = router;
