const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/users');
const gigRoutes = require('./routes/gigs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 挂载路由
app.use('/api/users', userRoutes);
app.use('/api/gigs', gigRoutes);

app.listen(port, () => {
    console.log(`✅ 后端服务启动: http://localhost:${port}`);
});