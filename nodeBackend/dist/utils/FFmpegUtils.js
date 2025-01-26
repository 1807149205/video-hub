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
const node_path_1 = __importDefault(require("node:path"));
const fs = __importStar(require("node:fs"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const node_crypto_1 = require("node:crypto");
class FFmpegUtils {
    static extractImagesFromVideo(videoPath, numImages) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // Ensure the output directory exists
                const outputDir = node_path_1.default.join(node_path_1.default.dirname(videoPath), FFmpegUtils.imgChunkFilePath);
                if (!fs.existsSync(outputDir)) {
                    fs.mkdirSync(outputDir, { recursive: true });
                }
                // Get video duration
                fluent_ffmpeg_1.default.ffprobe(videoPath, (err, metadata) => {
                    if (err) {
                        return reject(err);
                    }
                    const duration = metadata.format.duration;
                    const interval = duration / numImages;
                    const imagePaths = [];
                    const uuid = (0, node_crypto_1.randomUUID)();
                    // Extract images
                    (0, fluent_ffmpeg_1.default)(videoPath)
                        .on('filenames', (filenames) => {
                        filenames.forEach((filename) => {
                            imagePaths.push(node_path_1.default.join(outputDir, filename));
                        });
                    })
                        .on('end', () => {
                        // resolve(imagePaths);
                    })
                        .on('error', (err) => {
                        reject(err);
                    })
                        .screenshots({
                        count: numImages,
                        folder: outputDir,
                        filename: `${uuid}-%i.png`,
                        timemarks: Array.from({ length: numImages }, (_, i) => (i * interval).toFixed(2))
                    })
                        .on('progress', (progress) => {
                        if (progress.percent) {
                            console.log(`Processing: ${progress.percent}% done`);
                            const result = [];
                            for (let i = 1; i <= numImages; i++) {
                                result.push(node_path_1.default.join(outputDir, `${uuid}-${i}.png`));
                            }
                            resolve(result);
                        }
                    });
                });
            });
        });
    }
}
FFmpegUtils.imgChunkFilePath = 'extracted_images';
// FFmpegUtils.extractImagesFromVideo("C:\\Users\\wzlpc\\Videos\\IMG_4957.MP4", 10).then((result) => {
//     console.log(result);
// });
exports.default = FFmpegUtils;
