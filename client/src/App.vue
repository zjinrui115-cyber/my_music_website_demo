<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
// 引入 Element Plus 的图标 (可选，为了更好看)
import { Delete, Plus } from '@element-plus/icons-vue'

const users = ref([])
const newName = ref('')
const API_URL = 'http://localhost:3000/api/users'

// 获取数据
const fetchUsers = async () => {
  try {
    const res = await axios.get(API_URL)
    users.value = res.data
  } catch (e) {
    ElMessage.error('连接后端失败') // 使用 Element 的消息提示
  }
}

// 添加用户
const addUser = async () => {
  if (!newName.value) return
  try {
    await axios.post(API_URL, { name: newName.value })
    newName.value = ''
    fetchUsers()
    ElMessage.success('添加成功') // 成功提示
  } catch (e) {
    ElMessage.error('添加失败')
  }
}

// (可选) 删除用户逻辑 - 配合后端练习
const deleteUser = async (id) => {
  try {
    // 发送 DELETE 请求，把 id 拼接到 URL 后面
    await axios.delete(`${API_URL}/${id}`)
    
    ElMessage.success('删除成功')
    fetchUsers() // 删完后，记得重新获取一下列表，让页面更新
  } catch (error) {
    console.error(error)
    ElMessage.error('删除失败')
  }
}

onMounted(fetchUsers)
</script>

<template>
  <div class="app-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>全栈用户管理</span>
        </div>
      </template>
      
      <div class="input-area">
        <el-input 
          v-model="newName" 
          placeholder="请输入新用户名" 
          @keyup.enter="addUser"
          style="width: 200px; margin-right: 10px;"
        />
        <el-button type="primary" :icon="Plus" @click="addUser">
          添加用户
        </el-button>
      </div>

      <el-table :data="users" style="width: 100%; margin-top: 20px" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="created_at" label="创建时间" />
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button 
              type="danger" 
              size="small" 
              :icon="Delete" 
              circle 
              @click="deleteUser(scope.row.id)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  justify-content: center;
  padding-top: 50px;
  background-color: #f0f2f5;
  min-height: 100vh;
}
.box-card {
  width: 600px;
}
.input-area {
  display: flex;
  align-items: center;
}
</style>