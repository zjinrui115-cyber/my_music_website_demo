import { defineStore } from 'pinia'
import { getGigList } from '@/api/gig' // <--- 1. 引入我们刚才写好的 API
import { ElMessage } from 'element-plus'

export const useGigStore = defineStore('gig', {
  state: () => ({
    gigs: [], 
    loading: false
  }),
  
  actions: {
    async fetchGigs(params = {}) {
      this.loading = true
      try {
        // 2. 修改这里：使用 API 方法，而不是直接 axios.get
        const res = await getGigList(params)
        
        this.gigs = res.data
      } catch (error) {
        console.error(error)
        ElMessage.error('无法加载服务列表')
      } finally {
        this.loading = false
      }
    }
  }
})