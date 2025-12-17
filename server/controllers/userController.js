const db = require('../db');

module.exports = {
    // 1. 【补回】获取所有用户列表
    async getAllUsers(req, res) {
        try {
            // 查询所有用户，排除密码字段
            const { rows } = await db.query('SELECT id, username, email, img, is_seller, rating, tags FROM users ORDER BY id DESC');
            res.json(rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: '获取用户列表失败' });
        }
    },

    // 2. 获取单个用户详情
    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const { rows } = await db.query('SELECT id, username, email, img, is_seller, rating, tags FROM users WHERE id = $1', [id]);
            if (rows.length === 0) {
                return res.status(404).json({ error: '用户不存在' });
            }
            res.json(rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: '服务器出错' });
        }
    },

    // 3. 注册/创建用户
    async createUser(req, res) {
        const { username, email, password, is_seller, tags } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ error: '请填写完整信息' });
        }

        const text = `
            INSERT INTO users(username, email, password, is_seller, tags, img) 
            VALUES($1, $2, $3, $4, $5, $6) 
            RETURNING id, username, email, is_seller
        `;
        
        const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
        
        const values = [
            username, 
            email, 
            password, 
            is_seller || false, 
            tags || [],
            defaultAvatar
        ];

        try {
            const { rows } = await db.query(text, values);
            res.status(201).json(rows[0]); 
        } catch (err) {
            console.error(err);
            if (err.code === '23505') { 
                return res.status(409).json({ error: '邮箱或用户名已存在' });
            }
            res.status(500).json({ error: '注册失败' });
        }
    }
};