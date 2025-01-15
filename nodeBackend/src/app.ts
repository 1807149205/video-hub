import express from 'express';
import userRouters from './routes/userRoutes'
import envRouters from './routes/envRoutes'

const app = express();
const PORT = 3000;

app.use(express.json()); // 解析 JSON 请求体

// 路由配置
app.use(`/user`, userRouters);
app.use(`/env`, envRouters);

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});