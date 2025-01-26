import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes'
import envRouter from './routes/envRoutes'
import fileRoutes from "./routes/fileRoutes";
import videoTagRoutes from "./routes/videoTagRoutes";
import * as dotenv from 'dotenv';
import videoRoutes from "./routes/videoRoutes";

dotenv.config();

const uploadPath = process.env.VIDEO_SAVE_PATH || "";
const env = process.env.NODE_ENV || 'development';

const app = express();
const PORT = 8211;

// 解析 JSON 请求体
app.use(express.json({limit: '500mb'}));
app.use(express.static(uploadPath));

// 配置 CORS
app.use(cors());

app.all('/*', function(req, res, next) {
  const reqMethod = req.method.toLowerCase();
  const token = req.headers['token'];
  if (reqMethod === 'get') {
    console.log('[Request]', req.method, req.url, token,  req.params);
  } else if (reqMethod === 'post') {
    console.log('[Request]', req.method, req.url, token,  req.body);
  }
  next();
});

// 路由配置
app.use('/user', userRouter);
app.use('/env', envRouter);
app.use('/file', fileRoutes);
app.use('/videoTag', videoTagRoutes);
app.use('/video', videoRoutes);

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}\nenv: ${env}`);
});
