const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 数据库连接 (本地版：无 SSL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 测试连接
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ 数据库连接失败:', err.message);
  }
  console.log('✅ 成功连接到本地 PostgreSQL 数据库!');
  release();
});

// 路由 1: 获取用户
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '服务器出错' });
  }
});

// 路由 2: 添加用户
app.post('/api/users', async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query(
      'INSERT INTO users (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '添加失败' });
  }
});

// 路由 3: 删除用户
app.delete('/api/users/:id', async (req, res) => {
  try {
    // 1. 从 URL 获取要删除的 id
    const { id } = req.params;
    
    // 2. 执行 SQL 删除
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);

    // 3. 检查是否真的删除了数据
    if (result.rowCount === 0) {
      return res.status(404).json({ error: '未找到该用户' });
    }

    // 4. 返回成功信息
    res.json({ message: '用户已删除' });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('服务器内部错误');
  }
});

app.listen(port, () => {
  console.log(`后端服务已启动: http://localhost:${port}`);
});