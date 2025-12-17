const db = require('../db');

module.exports = {
    // 获取单个用户详情 (例如点进卖家主页)
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

    // 注册/创建用户 (适配新表结构)
    async createUser(req, res) {
        const { username, email, password, is_seller, tags } = req.body;
        
        // 简单校验
        if (!username || !email || !password) {
            return res.status(400).json({ error: '请填写完整信息 (用户名, 邮箱, 密码)' });
        }

        const text = `
            INSERT INTO users(username, email, password, is_seller, tags, img) 
            VALUES($1, $2, $3, $4, $5, $6) 
            RETURNING id, username, email, is_seller
        `;
        
        // 默认头像 (使用 DiceBear 生成随机头像)
        const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
        
        const values = [
            username, 
            email, 
            password, // 注意：正式项目这里必须用 bcrypt 加密，Demo项目先存明文方便演示
            is_seller || false, 
            tags || [],
            defaultAvatar
        ];

        try {
            const { rows } = await db.query(text, values);
            res.status(201).json(rows[0]); 
        } catch (err) {
            console.error(err);
            if (err.code === '23505') { // PostgreSQL 唯一性约束错误码
                return res.status(409).json({ error: '邮箱或用户名已存在' });
            }
            res.status(500).json({ error: '注册失败' });
        }
    }
};