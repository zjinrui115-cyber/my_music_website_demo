<script setup>
import { onMounted, ref } from 'vue'
import { Search, StarFilled, Star } from '@element-plus/icons-vue' 
import { storeToRefs } from 'pinia'
import { useGigStore } from '@/stores/gig'

const gigStore = useGigStore()
const { gigs, loading } = storeToRefs(gigStore)
const { fetchGigs } = gigStore

const searchQuery = ref('')
const activeCategory = ref('全部')

const categories = [
  { label: '全部', value: '' },
  { label: '🎵 音乐制作', value: 'music' },
  { label: '🎨 视觉设计', value: 'design' },
  { label: '💻 开发', value: 'code' },
  { label: '📸 摄影', value: 'photo' }
]

const handleCategoryClick = (cat) => {
  activeCategory.value = cat.label
  fetchGigs({ category: cat.value })
}

const handleSearch = () => {
  fetchGigs({ search: searchQuery.value })
}

onMounted(() => {
  fetchGigs()
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
            <input 
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text" 
              placeholder="搜索服务 (例如: beat)" 
              class="search-input" 
            />
          </div>
        </div>
        <div class="nav-auth">
          <button class="btn-text">登录</button>
          <button class="btn-primary-small">入驻平台</button>
        </div>
      </div>
    </nav>

    <header class="hero-section">
      <div class="hero-animate-wrapper">
        <h1 class="hero-title">
          找到最适合你的<br>专业服务。
        </h1>
        <p class="hero-subtitle">
          按需雇佣音乐人、设计师与开发者。
        </p>
      </div>
    </header>

    <section class="filter-section">
      <button 
        v-for="cat in categories" 
        :key="cat.value" 
        class="filter-btn"
        :class="{ active: activeCategory === cat.label }"
        @click="handleCategoryClick(cat)"
      >
        {{ cat.label }}
      </button>
    </section>

    <div v-if="loading" class="loading-state">
      加载中...
    </div>

    <main v-else class="gig-grid">
      <div v-for="gig in gigs" :key="gig.id" class="gig-card">
        
        <div class="card-image-wrapper">
          <img :src="gig.cover_img" alt="cover" class="card-cover-img" />
        </div>

        <div class="card-body">
          <div class="seller-info">
            <img :src="gig.seller_avatar" class="seller-avatar" />
            <span class="seller-name">{{ gig.seller_name }}</span>
            <div class="level-badge">Lv.2</div>
          </div>

          <h3 class="gig-title">
            {{ gig.title }}
          </h3>

          <div class="rating-row">
            <el-icon class="star-icon"><StarFilled /></el-icon>
            <span class="score">5.0</span>
            <span class="count">(26)</span>
          </div>
        </div>

        <div class="card-footer">
          <el-icon class="heart-icon"><Star /></el-icon>
          <div class="price-wrapper">
            <span class="price-label">起价</span>
            <span class="price-num">¥{{ gig.price }}</span>
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
/* 样式保持不变 */
.home-container {
  min-height: 100vh;
  background-color: #ffffff;
  color: #404145;
  font-family: "Macan", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 60px;
  background-color: white;
  border-bottom: 1px solid #e4e5e7;
  z-index: 999;
  display: flex;
  justify-content: center;
}
.nav-inner {
  width: 100%; max-width: 1400px; padding: 0 32px;
  display: flex; align-items: center; justify-content: space-between;
}
.nav-left { display: flex; align-items: center; gap: 24px; }
.brand { font-weight: 800; font-size: 24px; letter-spacing: -1px; color: #404145; }
.search-wrapper { position: relative; display: flex; align-items: center; }
.search-icon { position: absolute; left: 10px; color: #95979d; }
.search-input {
  background-color: white; border: 1px solid #e4e5e7; border-radius: 4px;
  padding: 8px 12px 8px 36px; font-size: 14px; width: 240px; outline: none;
  transition: all 0.2s;
}
.search-input:focus { border-color: #222325; width: 300px; }

.nav-auth { display: flex; gap: 16px; align-items: center; }
.btn-text { background: none; border: none; font-weight: 600; color: #62646a; cursor: pointer; }
.btn-primary-small {
  background: white; border: 1px solid #1dbf73; color: #1dbf73;
  padding: 4px 16px; border-radius: 4px; font-weight: 600; cursor: pointer;
}
.btn-primary-small:hover { background: #1dbf73; color: white; }

.hero-section { padding: 100px 20px 40px; text-align: center; background-color: #f7f7f7; }
.hero-title { font-size: 40px; font-weight: 700; color: #404145; margin-bottom: 10px; }
.hero-subtitle { font-size: 18px; color: #62646a; }

.filter-section {
  display: flex; justify-content: center; gap: 12px; margin: 30px 0;
}
.filter-btn {
  background: white; border: 1px solid #e4e5e7; padding: 6px 14px;
  border-radius: 20px; color: #62646a; font-weight: 600; cursor: pointer;
}
.filter-btn:hover { background: #f7f7f7; }
.filter-btn.active { border-color: black; color: black; background: #f0f0f0; }

.gig-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 32px;
  padding: 0 32px 80px;
  max-width: 1400px;
  margin: 0 auto;
}

.gig-card {
  border: 1px solid #e4e5e7;
  background: white;
  display: flex; flex-direction: column;
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.gig-card:hover { box-shadow: 0 5px 10px rgba(0,0,0,0.1); }
.gig-card:hover .gig-title { color: #1dbf73; }

.card-image-wrapper { height: 160px; overflow: hidden; background: #eee; }
.card-cover-img { width: 100%; height: 100%; object-fit: cover; }

.card-body { padding: 12px 12px 0; flex: 1; display: flex; flex-direction: column; }

.seller-info { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
.seller-avatar { width: 24px; height: 24px; border-radius: 50%; object-fit: cover; }
.seller-name { font-weight: 700; font-size: 14px; color: #222325; }
.level-badge { font-size: 10px; color: #62646a; }

.gig-title {
  font-size: 16px; color: #404145; line-height: 1.4; margin: 0 0 10px;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  font-weight: 400;
  min-height: 44px;
}

.rating-row { display: flex; align-items: center; gap: 4px; font-weight: 700; font-size: 14px; margin-top: auto; padding-bottom: 12px; }
.star-icon { color: #ffbe5b; }
.score { color: #404145; }
.count { color: #95979d; font-weight: 400; }

.card-footer {
  border-top: 1px solid #e4e5e7;
  padding: 10px 12px;
  display: flex; justify-content: space-between; align-items: center;
}
.heart-icon { color: #b5b6ba; font-size: 16px; }
.price-wrapper { display: flex; flex-direction: column; align-items: flex-end; }
.price-label { font-size: 10px; color: #74767e; font-weight: 600; text-transform: uppercase; }
.price-num { font-size: 18px; color: #404145; font-weight: 400; }

.loading-state { text-align: center; padding: 40px; color: #999; }
.page-footer { text-align: center; padding: 40px; font-size: 12px; color: #b5b6ba; border-top: 1px solid #e4e5e7; }
</style>