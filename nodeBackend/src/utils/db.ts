import * as mysql from 'mysql2';
import * as dotenv from 'dotenv';

dotenv.config();

// 从环境变量中加载配置
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_PORT = process.env.MYSQL_PORT || 3306
const MYSQL_USERNAME = process.env.MYSQL_USERNAME;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;

// 创建数据库连接池
const pool = mysql.createPool({
  host: MYSQL_HOST,
  user: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: 'video_hub',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 导出一个 promise 包装的连接池
const db = pool.promise();

export default db;
