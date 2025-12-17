const db = require('../db');

exports.getAllUsers = async (req, res) => {
    try {
        // 使用封装的 query
        const result = await db.query('SELECT * FROM users ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '服务器出错' });
    }
};

exports.createUser = async (req, res) => {
    const { name } = req.body;
    // ... 你的插入逻辑
};