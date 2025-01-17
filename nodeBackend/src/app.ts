import express from 'express';
import userRouters from './routes/userRoutes';
import envRouters from './routes/envRoutes';
import cors from 'cors';

const app = express();
const PORT = 3000;

// 配置 CORS
app.use(cors())

// 确保 OPTIONS 请求正确处理（针对复杂请求）
app.options('*', cors());

// 中间件解析 JSON 请求体
app.use(express.json());

// 路由配置
app.use('/user', userRouters);
app.use('/env', envRouters);

// 全局错误处理中间件，确保返回正确响应
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
