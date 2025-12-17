const db = require('../db');

module.exports = {
    // 正确写法 1：对象简写异步方法
    async getAllUsers(req, res) {
        try {
            const result = await db.query('SELECT * FROM users ORDER BY id DESC');
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: '服务器出错' });
        }
    }, // 别忘了逗号

    // 正确写法 2
    async createUser(req, res) {
        // 解构获取前端传来的数据
        const { name, role, tags, rating } = req.body;
        
        // 修正：将 values 与 SQL 占位符一一对应
        // 如果你想用前端传来的 rating，就把 5.0 改成 $4
        const text = 'INSERT INTO users(name, role, tags, rating) VALUES($1, $2, $3, $4) RETURNING *';
        const values = [name, role, tags, rating || 5.0]; // 如果前端没传 rating，默认 5.0

        try {
            const { rows } = await db.query(text, values);
            res.status(201).json(rows[0]); 
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: '创建用户失败' });
        }
    }
};