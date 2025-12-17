// server/initDb.js
const db = require('./db'); // 引入你现有的 db 连接

const createTablesSql = `
    -- 1. 用户表 (Users) - 增加身份、头像、密码等字段
    DROP TABLE IF EXISTS users CASCADE;
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        img VARCHAR(255), -- 头像
        is_seller BOOLEAN DEFAULT false, -- 是否是卖家
        rating DECIMAL(2, 1) DEFAULT 0.0, -- 评分 (例如 4.9)
        tags TEXT[], -- 技能标签，PG支持数组类型
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- 2. 服务/商品表 (Gigs) - 核心表
    DROP TABLE IF EXISTS gigs CASCADE;
    CREATE TABLE gigs (
        id SERIAL PRIMARY KEY,
        seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE, -- 关联卖家
        title VARCHAR(255) NOT NULL,
        desc_text TEXT NOT NULL, -- 详细描述
        cover_img VARCHAR(255), -- 封面图
        price INTEGER NOT NULL, -- 价格
        category VARCHAR(100) NOT NULL, -- 分类 (music, design...)
        delivery_time INTEGER DEFAULT 3, -- 交付天数
        sales INTEGER DEFAULT 0, -- 销量
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- 3. 订单表 (Orders)
    DROP TABLE IF EXISTS orders CASCADE;
    CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        gig_id INTEGER REFERENCES gigs(id),
        img VARCHAR(255),
        title VARCHAR(255),
        price INTEGER NOT NULL,
        seller_id INTEGER REFERENCES users(id),
        buyer_id INTEGER REFERENCES users(id),
        is_completed BOOLEAN DEFAULT false,
        payment_intent VARCHAR(255), -- 预留给支付系统的 ID
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- 4. 评价表 (Reviews)
    DROP TABLE IF EXISTS reviews CASCADE;
    CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        gig_id INTEGER REFERENCES gigs(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id), -- 评价人
        star INTEGER CHECK (star >= 1 AND star <= 5), -- 1-5星
        desc_text TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

const initDb = async () => {
    try {
        console.log('正在初始化数据库表结构...');
        await db.query(createTablesSql);
        console.log('✅ 数据库表创建成功！');
        
        // 可选：插入一条测试数据
        // const seedSql = "INSERT INTO users(username, email, password, is_seller) VALUES ('testuser', 'test@test.com', '123456', true);";
        // await db.query(seedSql);
        // console.log('✅ 测试数据插入成功！');
        
    } catch (err) {
        console.error('❌ 初始化失败:', err);
    } finally {
        process.exit();
    }
};

initDb();