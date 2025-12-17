import { defineStore } from 'pinia'
import axios from 'axios'
import { ElMessage } from 'element-plus'

export const useGigStore = defineStore('gig', {
  state: () => ({
    gigs: [], // 存放服务列表
    loading: false
  }),
  
  actions: {
    // 支持传入查询参数 (例如: { category: 'music', search: 'beat' })
    async fetchGigs(params = {}) {
      this.loading = true
      try {
        // 这里的 params 会自动转换成 URL 查询字符串，如 /api/gigs?category=music
        const res = await axios.get('/api/gigs', { params })
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