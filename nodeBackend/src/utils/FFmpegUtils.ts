import path from "node:path";
import * as fs from "node:fs";
import ffmpeg from "fluent-ffmpeg";
import {randomUUID} from "node:crypto";

class FFmpegUtils {
    static imgChunkFilePath: string = 'extracted_images'

    static async extractImagesFromVideo(videoPath: string, numImages: number): Promise<string[]> {
        return new Promise((resolve, reject) => {
            // Ensure the output directory exists
            const outputDir = path.join(path.dirname(videoPath), FFmpegUtils.imgChunkFilePath);
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            // Get video duration
            ffmpeg.ffprobe(videoPath, (err, metadata) => {
                if (err) {
                    return reject(err);
                }

                const duration = metadata.format.duration as number;
                const interval = duration / numImages;
                const imagePaths: string[] = [];

                const uuid = randomUUID();

                // Extract images
                ffmpeg(videoPath)
                    .on('filenames', (filenames) => {
                        filenames.forEach((filename) => {
                            imagePaths.push(path.join(outputDir, filename));
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
                            for (let i = 1; i <= numImages ; i++) {
                                result.push(path.join(outputDir, `${uuid}-${i}.png`));
                            }
                            resolve(result);
                        }
                    })
            });
        });
    }
}

// FFmpegUtils.extractImagesFromVideo("C:\\Users\\wzlpc\\Videos\\IMG_4957.MP4", 10).then((result) => {
//     console.log(result);
// });

export default FFmpegUtils;