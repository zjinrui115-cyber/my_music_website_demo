const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// 封装 query 方法，方便以后加日志
module.exports = {
  // 修改这里：增加对 params 的判断
  query: (text, params) => {
    // 如果 params 是 undefined（即调用时没传第二个参数），直接传 text 给 pool
    // 否则 pool.query(text, undefined) 会被误认为 undefined 是个回调函数从而报错
    if (params === undefined) {
        return pool.query(text);
    }
    return pool.query(text, params);
  },
  pool, // 导出 pool 以便测试连接
};