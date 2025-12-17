<script setup>
import { onMounted } from 'vue'
import { Search, StarFilled } from '@element-plus/icons-vue' 

// 1. 引入 Pinia 相关
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

// 2. 初始化 store
const userStore = useUserStore()

// 3. 使用 storeToRefs 解构数据 (保持响应式)
// 这样 users 发生变化时，页面会自动更新
const { users } = storeToRefs(userStore)

// 4. Action (方法) 不需要 storeToRefs，直接解构或者用 userStore.fetchUsers 均可
const { fetchUsers } = userStore

// 5. 辅助函数 (纯 UI 逻辑，不需要进 Store)
const getCardBg = (id) => {
  const bgs = [
    'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
    'linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)',
    'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
    'linear-gradient(to top, #fddb92 0%, #d1fdff 100%)',
  ]
  return bgs[id % bgs.length]
}

// 6. 挂载时调用 Store 里的方法
onMounted(() => {
  fetchUsers()
})
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
            <span class="text-sm font-semibold text-[#1d1d1f]">¥{{ user.price || '2,000' }} 起</span>
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