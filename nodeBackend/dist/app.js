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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const envRoutes_1 = __importDefault(require("./routes/envRoutes"));
const fileRoutes_1 = __importDefault(require("./routes/fileRoutes"));
const videoTagRoutes_1 = __importDefault(require("./routes/videoTagRoutes"));
const dotenv = __importStar(require("dotenv"));
const videoRoutes_1 = __importDefault(require("./routes/videoRoutes"));
dotenv.config();
const uploadPath = process.env.VIDEO_SAVE_PATH || "";
const env = process.env.NODE_ENV || 'development';
const app = (0, express_1.default)();
const PORT = 8211;
// 解析 JSON 请求体
app.use(express_1.default.json({ limit: '500mb' }));
app.use(express_1.default.static(uploadPath));
// 配置 CORS
app.use((0, cors_1.default)());
app.all('/*', function (req, res, next) {
    const reqMethod = req.method.toLowerCase();
    const token = req.headers['token'];
    if (reqMethod === 'get') {
        console.log('[Request]', req.method, req.url, token, req.params);
    }
    else if (reqMethod === 'post') {
        console.log('[Request]', req.method, req.url, token, req.body);
    }
    next();
});
// 路由配置
app.use('/user', userRoutes_1.default);
app.use('/env', envRoutes_1.default);
app.use('/file', fileRoutes_1.default);
app.use('/videoTag', videoTagRoutes_1.default);
app.use('/video', videoRoutes_1.default);
// 启动服务器
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}\nenv: ${env}`);
});
