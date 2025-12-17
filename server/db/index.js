const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// 封装 query 方法，方便以后加日志
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool, // 导出 pool 以便测试连接
};