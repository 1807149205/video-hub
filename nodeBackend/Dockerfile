# 使用官方 Node.js 镜像作为基础镜像
FROM node:21

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 暴露应用运行的端口
EXPOSE 8211

# 启动应用
CMD ["npm", "run", "prod-start"]