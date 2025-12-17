// client/src/stores/user.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getUserList, createUser } from '@/api/user'


export const useUserStore = defineStore('user', () => {
  // State (数据)
  const users = ref([])
  const loading = ref(false)

  // Actions (方法)
  const fetchUsers = async () => {
    loading.value = true
    try {
      const res = await getUserList()
      users.value = res.data
    } catch (error) {
      console.error(error)
      ElMessage.error('获取用户列表失败')
    } finally {
      loading.value = false
    }
  }

  const addUser = async (userData) => {
    try {
      await createUser(userData)
      ElMessage.success(`欢迎 ${userData.name} 加入！`)
      // 添加成功后，重新拉取列表
      await fetchUsers()
      return true
    } catch (error) {
      console.error(error)
      ElMessage.error('添加失败')
      return false
    }
  }

  return { users, loading, fetchUsers, addUser }
})