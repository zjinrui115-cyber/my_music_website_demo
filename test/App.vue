<script setup>
import { onMounted } from 'vue'
import { Search, StarFilled } from '@element-plus/icons-vue' 
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

// --- 逻辑层 (保持不变，依旧使用 Pinia) ---
const userStore = useUserStore()
const { users } = storeToRefs(userStore) // 保持响应式
const { fetchUsers } = userStore

const getCardBg = (id) => {
  const bgs = [
    'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
    'linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)',
    'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
    'linear-gradient(to top, #fddb92 0%, #d1fdff 100%)',
  ]
  return bgs[id % bgs.length]
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div class="home-container">
    
    <nav class="navbar">
      <div class="nav-inner">
        
        <div class="nav-left">
          <div class="brand">Creators.</div>
          <div class="search-wrapper">
            <el-icon class="search-icon"><Search /></el-icon>
            <input type="text" placeholder="搜索人才" class="search-input" />
          </div>
        </div>

        <div class="nav-links">
          <a href="#">发现人才</a>
          <a href="#">发布需求</a>
          <a href="#">创作政策</a>
        </div>

        <div class="nav-auth">
          <button class="btn-text">登录</button>
          <button class="btn-primary-small">入驻平台</button>
        </div>
      </div>
    </nav>

    <header class="hero-section">
      <div class="hero-animate-wrapper">
        <span class="hero-tag">专业服务平台</span>
        <h1 class="hero-title">
          找到最懂你的<br>创作者。
        </h1>
        <p class="hero-subtitle">
          连接 10,000+ 位经过验证的音乐人、设计师与开发者。<br>为你的项目注入顶尖创造力。
        </p>
      </div>
    </header>

    <section class="filter-section">
      <button class="filter-btn active">全部</button>
      <button v-for="btn in ['🎵 音乐制作', '🎨 视觉设计', '💻 开发', '📸 摄影']" :key="btn" class="filter-btn">
        {{ btn }}
      </button>
    </section>

    <main class="user-grid">
      <div v-for="(user, index) in users" :key="user.id" class="user-card">
        
        <div class="card-cover" :style="{ background: getCardBg(index) }">
          <div class="status-badge">可接单</div>
        </div>

        <div class="card-body">
          <div class="card-top">
            <h3 class="user-name">{{ user.name }}</h3>
            <div class="user-rating">
              <el-icon class="star-icon"><StarFilled /></el-icon>
              <span>{{ user.rating }}</span>
            </div>
          </div>
          
          <p class="user-role">{{ user.role }}</p>
          
          <div class="user-tags">
            <span v-for="tag in user.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>

          <div class="card-footer">
            <span class="price">¥{{ user.price || '2,000' }} 起</span>
            <button class="btn-contact">联系</button>
          </div>
        </div>
      </div>
    </main>

    <footer class="page-footer">
      <p>Copyright © 2024 Creators Inc.</p>
    </footer>

  </div>
</template>

<style scoped>
/* 全局容器设置 */
.home-container {
  min-height: 100vh;
  background-color: #fbfbfd;
  color: #1d1d1f;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

/* --- 导航栏样式 --- */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 52px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  z-index: 999;
  display: flex;
  justify-content: center;
}

.nav-inner {
  width: 100%;
  max-width: 1440px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.brand {
  font-weight: 700;
  font-size: 19px;
  letter-spacing: -0.5px;
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 8px;
  color: #86868b;
  font-size: 14px;
  pointer-events: none;
}

.search-input {
  background-color: #f5f5f7;
  border: none;
  border-radius: 8px;
  padding: 6px 12px 6px 30px;
  font-size: 13px;
  width: 160px;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  background-color: #ffffff;
  width: 200px;
  box-shadow: 0 0 0 2px rgba(0, 113, 227, 0.4);
}

.nav-links {
  display: none; /* 移动端默认隐藏 */
  gap: 30px;
}

@media (min-width: 768px) {
  .nav-links {
    display: flex;
  }
}

.nav-links a {
  font-size: 13px;
  color: #6e6e73;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #1d1d1f;
}

.nav-auth {
  display: flex;
  align-items: center;
  gap: 16px;
}

.btn-text {
  background: none;
  border: none;
  font-size: 13px;
  color: #1d1d1f;
  cursor: pointer;
}

.btn-text:hover {
  opacity: 0.7;
}

.btn-primary-small {
  background-color: #1d1d1f;
  color: white;
  border: none;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary-small:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

/* --- Hero (标题) 区域样式 --- */
.hero-section {
  padding-top: 120px;
  padding-bottom: 60px;
  padding-left: 40px;
  padding-right: 40px;
  text-align: center;
}

.hero-tag {
  display: block;
  color: #f56300;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
}

.hero-title {
  font-size: 56px;
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: -1.5px;
  margin-bottom: 20px;
  margin-top: 0;
}

.hero-subtitle {
  font-size: 21px;
  line-height: 1.5;
  color: #86868b;
  font-weight: 400;
}

/* --- 筛选按钮样式 --- */
.filter-section {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 50px;
  padding: 0 24px;
  overflow-x: auto;
}

.filter-btn {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.05);
  color: #1d1d1f;
  transition: background-color 0.2s;
}

.filter-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.filter-btn.active {
  background-color: #1d1d1f;
  color: white;
}

/* --- 卡片网格布局 --- */
.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  padding: 0 40px 80px 40px;
  max-width: 1440px;
  margin: 0 auto;
}

/* --- 单个卡片样式 --- */
.user-card {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  cursor: pointer;
}

.user-card:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.card-cover {
  height: 180px;
  position: relative;
}

.status-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: #008800;
}

.card-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.user-name {
  font-size: 19px;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0;
}

.user-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 600;
  color: #1d1d1f;
}

.star-icon {
  color: #F5A623;
}

.user-role {
  font-size: 14px;
  color: #86868b;
  margin-bottom: 16px;
  margin-top: 0;
}

.user-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.tag {
  font-size: 12px;
  color: #6e6e73;
  background-color: #f5f5f7;
  padding: 4px 8px;
  border-radius: 6px;
}

.card-footer {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #f5f5f7;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 14px;
  font-weight: 600;
  color: #1d1d1f;
}

.btn-contact {
  background-color: #0071e3;
  color: white;
  border: none;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-contact:hover {
  background-color: #0077ed;
}

/* --- 底部样式 --- */
.page-footer {
  text-align: center;
  padding: 40px 0;
  font-size: 12px;
  color: #cecece;
  background-color: #1d1d1f;
}

/* --- 动画部分 --- */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}

@keyframes floatingDepth {
  0%, 100% { transform: scale(1); text-shadow: 0 0 0 rgba(0,0,0,0); }
  50% { transform: scale(1.03); text-shadow: 0 10px 20px rgba(0,0,0,0.1); }
}

.hero-animate-wrapper {
  animation: 
    fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards,
    floatingDepth 6s ease-in-out infinite 1s; 
}
</style>