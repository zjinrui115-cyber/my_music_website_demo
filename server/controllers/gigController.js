const db = require('../db');

module.exports = {
    // 1. 获取服务列表 (支持搜索和分类筛选)
    async getAllGigs(req, res) {
        const { category, search } = req.query;
        
        // 基础 SQL：关联 gigs 表和 users 表，获取卖家头像和名字
        let text = `
            SELECT 
                g.id, 
                g.title, 
                g.price, 
                g.cover_img, 
                g.category, 
                g.rating, -- 注意：如果表里没rating字段，后续需从reviews表聚合计算，这里暂时假设gigs表有或先不查
                g.delivery_time,
                u.username AS seller_name, 
                u.img AS seller_avatar, 
                u.rating AS seller_rating
            FROM gigs g
            JOIN users u ON g.seller_id = u.id
            WHERE 1=1
        `;
        
        const values = [];
        let paramIndex = 1;

        // 动态添加筛选条件
        if (category) {
            text += ` AND g.category = $${paramIndex}`;
            values.push(category);
            paramIndex++;
        }

        if (search) {
            text += ` AND (g.title ILIKE $${paramIndex} OR g.desc_text ILIKE $${paramIndex})`;
            values.push(`%${search}%`); // ILIKE 是 PG 的忽略大小写模糊查询
            paramIndex++;
        }

        text += ' ORDER BY g.id DESC';

        try {
            const { rows } = await db.query(text, values);
            res.json(rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: '获取服务列表失败' });
        }
    },

    // 2. 获取单个服务详情
    async getGigById(req, res) {
        const { id } = req.params;
        const text = `
            SELECT 
                g.*, 
                u.username AS seller_name, 
                u.img AS seller_avatar, 
                u.rating AS seller_rating,
                u.id AS seller_id
            FROM gigs g
            JOIN users u ON g.seller_id = u.id
            WHERE g.id = $1
        `;

        try {
            const { rows } = await db.query(text, [id]);
            if (rows.length === 0) return res.status(404).json({ error: '服务未找到' });
            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ error: '查询出错' });
        }
    },

    // 3. 发布新服务
    async createGig(req, res) {
        // seller_id 一般从登录 Token 获取，这里暂时从 body 传方便测试
        const { seller_id, title, desc_text, price, category, delivery_time } = req.body;

        // 简单的随机封面图 (用于演示)
        const cover_img = `https://source.unsplash.com/random/800x600/?${category || 'work'}`;

        const text = `
            INSERT INTO gigs(seller_id, title, desc_text, price, category, delivery_time, cover_img)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
        
        const values = [seller_id, title, desc_text, price, category, delivery_time || 3, cover_img];

        try {
            const { rows } = await db.query(text, values);
            res.status(201).json(rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: '发布服务失败' });
        }
    }
};