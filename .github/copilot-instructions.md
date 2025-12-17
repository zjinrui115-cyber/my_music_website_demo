# Copilot 使用指引（为本仓库量身定制）

以下内容旨在帮助 AI 代码代理快速上手本项目，聚焦可被代码库证明的约定、运行流程与关键位置。

## 一句话概览
- 本仓库为一个小型全栈示例：前端在 `client/`（Vue 3 + Vite + Element Plus），后端在 `server/`（Express + PostgreSQL）。前端通过 REST API 与后端交互，后端通过 `DATABASE_URL` 环境变量连接 PostgreSQL。

## 关键目录与文件
- `client/`：前端源码（Vite + Vue 3）。入口示例为 `client/src/App.vue`，构建与开发脚本在 `client/package.json`。
- `server/`：后端 API（Express）。主要启动文件为 `server/index.js`，依赖见 `server/package.json`。
- `client/vite.config.js`：Vite 配置，定义了 `@` 别名映射到 `client/src`。

## 架构与数据流要点
- 前端直接请求硬编码的 API地址：`http://localhost:3000/api/users`（见 `client/src/App.vue`），因此本地联调时后端通常监听 3000 端口。
- 后端通过 `pg` 的 `Pool` 使用 `process.env.DATABASE_URL` 连接 PostgreSQL；没有额外的 ORM，直接执行 SQL（示例：`SELECT * FROM users`、`INSERT INTO users`、`DELETE FROM users WHERE id = $1`）。
- 前端在增删用户后会重新拉取列表（`fetchUsers()`），所以在实现新端点时保持幂等与合理的响应状态码很重要（如 404 时前端有专门处理）。

## 运行与开发流程（可复制的命令）
- 安装依赖：在项目根或单独目录下运行

```
cd client
npm install

cd ../server
npm install
```

- 启动前端（热重载）：
```
cd client
npm run dev
```

- 启动后端（无 `start` 脚本时直接运行）：
```
cd server
node index.js
```

环境变量：后端需要 `DATABASE_URL`（Postgres 连接串），可选 `PORT`。本地开发时通常设置为 `postgres://user:pass@localhost:5432/dbname`。

## 项目约定与细节（对 AI 有用的实现线索）
- 前端采用 Element Plus 组件库，局部示例里显式引入了 `el-message.css`（见 `client/src/App.vue`）；如果进行按需导入或更改样式导入，注意保留消息组件样式。 
- 前端使用 `axios` 发起 REST 请求，错误处理有针对性分支（例如删除时若后端返回 404，会触发重拉列表）。修改 API 时请保持这些语义以免破坏现有 UX。
- 后端为 CommonJS (`type: commonjs`)，前端包配置为 `type: module`，因此在编辑后端时请使用 `require`/`module.exports` 风格或保持现状。

## 推荐修改与 PR 指引（针对 AI 代理）
- 若新增 API，请在 `server/index.js` 中以现有风格实现（使用 `async/await` + `pool.query`，并返回适当的 HTTP 状态码与 JSON 响应）。
- 若修改前端 API 地址，务必同时更新 `client/src/App.vue` 中的 `API_URL`，或将其抽成环境变量（Vite 使用 `import.meta.env`）。
- 提交代码前请在本地验证：前端 `npm run dev` 能加载页面并能成功调用后端；后端 `node index.js` 能连接到数据库且该数据库有 `users` 表（`id`, `name`, `created_at` 等列）。

## 参考文件示例（快速定位）
- 用户列表与 CRUD 示例：`client/src/App.vue`（前端交互样例）
- 后端路由与 DB 示例：`server/index.js`（包含 `SELECT/INSERT/DELETE`）
- 构建/运行脚本：`client/package.json`、`server/package.json`
- 构建配置与别名：`client/vite.config.js`

---
如果你希望我把 `API_URL` 抽成 Vite 环境变量、添加 `server` 的 `start` 脚本，或把数据库连接改为支持 SSL（例如用于云数据库），告诉我优先级，我可以直接修改并提交补丁。
