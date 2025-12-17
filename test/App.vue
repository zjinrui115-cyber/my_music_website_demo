<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Search, StarFilled } from '@element-plus/icons-vue' // 确保引入了 Search
import { ElMessage } from 'element-plus'

// --- 逻辑层 (保持不变) ---
const users = ref([])
const API_URL = 'http://localhost:3000/api/users'

const fetchUsers = async () => {
  try {
    // 模拟数据，防止没有后端时报错
    // const res = await axios.get(API_URL)
    // users.value = res.data... 
    
    // 这里我直接生成模拟数据用于演示效果
    users.value = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      name: `Creator ${i + 1}`,
      role: Math.random() > 0.5 ? '音乐制作人' : '视觉设计师',
      rating: (4 + Math.random()).toFixed(1),
      tags: Math.random() > 0.5 ? ['编曲', '混音'] : ['UI设计', '3D建模']
    }))
  } catch (e) {
    ElMessage.error('无法加载人才列表')
  }
}

const getCardBg = (id) => {
  const bgs = [
    'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
    'linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)',
    'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
    'linear-gradient(to top, #fddb92 0%, #d1fdff 100%)',
  ]
  return bgs[id % bgs.length]
}

onMounted(fetchUsers)
</script>

<template>
  <div class="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] font-sans antialiased selection:bg-[#0071e3] selection:text-white">
    
    <nav class="fixed top-0 inset-x-0 h-[52px] bg-white/80 backdrop-blur-[20px] backdrop-saturate-[180%] z-[999] border-b border-black/5 flex justify-center">
      <div class="w-full max-w-[1440px] px-10 flex items-center justify-between">
        
        <div class="flex items-center gap-5">
          <div class="font-bold text-[19px] tracking-[-0.5px]">Creators.</div>
          
          <div class="relative flex items-center group">
            <el-icon class="absolute left-2 text-[#86868b] text-sm pointer-events-none"><Search /></el-icon>
            <input 
              type="text" 
              placeholder="搜索人才" 
              class="bg-[#f5f5f7] border-none rounded-lg py-1.5 px-3 pl-[30px] text-[13px] w-[160px] outline-none transition-all duration-300 focus:bg-white focus:w-[200px] focus:shadow-[0_0_0_2px_rgba(0,113,227,0.4)] placeholder:text-[#86868b]"
            />
          </div>
        </div>

        <div class="hidden md:flex gap-[30px]">
          <a href="#" class="text-[13px] text-[#1d1d1f] transition-colors">发现人才</a>
          <a href="#" class="text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">发布需求</a>
          <a href="#" class="text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">创作政策</a>
        </div>

        <div class="flex items-center gap-4">
          <button class="text-[13px] text-[#1d1d1f] hover:opacity-70 transition-opacity">登录</button>
          <button class="bg-[#1d1d1f] text-white px-3 py-1 rounded-full text-[12px] hover:bg-black/80 transition-colors">入驻平台</button>
        </div>
      </div>
    </nav>

    <header class="pt-[120px] pb-[60px] px-10 text-center w-full">
      <div class="hero-animate-wrapper">
        <span class="block text-[#f56300] font-semibold text-sm tracking-[0.5px] mb-4">专业服务平台</span>
        <h1 class="text-[56px] leading-[1.05] font-bold tracking-[-1.5px] mb-5">
          找到最懂你的<br>创作者。
        </h1>
        <p class="text-[21px] leading-relaxed text-[#86868b] font-normal">
          连接 10,000+ 位经过验证的音乐人、设计师与开发者。<br>为你的项目注入顶尖创造力。
        </p>
      </div>
    </header>

    <section class="flex justify-center gap-3 mb-[50px] px-6 overflow-x-auto no-scrollbar">
      <button class="bg-[#1d1d1f] text-white px-4 py-2 rounded-[20px] text-sm transition-all">全部</button>
      <button v-for="btn in ['🎵 音乐制作', '🎨 视觉设计', '💻 开发', '📸 摄影']" :key="btn" 
        class="bg-black/5 text-[#1d1d1f] px-4 py-2 rounded-[20px] text-sm hover:bg-black/10 transition-all">
        {{ btn }}
      </button>
    </section>

    <main class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 px-10 pb-20 max-w-[1440px] mx-auto">
      <div v-for="(user, index) in users" :key="user.id" 
        class="group flex flex-col bg-white rounded-[18px] overflow-hidden border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
        
        <div class="h-[180px] relative" :style="{ background: getCardBg(index) }">
          <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-[10px] px-2.5 py-1 rounded-full text-xs font-semibold text-[#008800]">
            可接单
          </div>
        </div>

        <div class="p-6 flex flex-col flex-1">
          <div class="flex justify-between items-center mb-1">
            <h3 class="text-[19px] font-semibold text-[#1d1d1f] m-0">{{ user.name }}</h3>
            <div class="flex items-center gap-1 text-[13px] font-semibold text-[#1d1d1f]">
              <el-icon class="text-[#F5A623]"><StarFilled /></el-icon>
              <span>{{ user.rating }}</span>
            </div>
          </div>
          
          <p class="text-sm text-[#86868b] mb-4">{{ user.role }}</p>
          
          <div class="flex gap-2 mb-6">
            <span v-for="tag in user.tags" :key="tag" class="text-xs text-[#6e6e73] bg-[#f5f5f7] px-2 py-1 rounded-md">
              {{ tag }}
            </span>
          </div>

          <div class="mt-auto flex justify-between items-center pt-4 border-t border-[#f5f5f7]">
            <span class="text-sm font-semibold text-[#1d1d1f]">¥2,000 起</span>
            <button class="bg-[#0071e3] text-white border-none px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors hover:bg-[#0077ed]">
              联系
            </button>
          </div>
        </div>
      </div>
    </main>

    <footer class="text-center py-10 text-xs text-[#cecece] bg-[#1d1d1f]">
      <p>Copyright © 2024 Creators Inc.</p>
    </footer>

  </div>
</template>

<style scoped>
/* Tailwind 对于复杂的 keyframes 组合动画支持不如原生 CSS 直观。
  为了保持“呼吸”和“上浮”的混合效果，这里保留 CSS 动画定义。
*/
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
    floatingDepth 6s ease-in-out infinite 1s; /* 1s delay matches fadeInUp duration approx */
}
</style>