import axios from 'axios'

const API_URL = '/api/gigs'

// 获取服务列表 (支持 ?category=music&search=beat)
export const getGigList = (params) => {
  return axios.get(API_URL, { params })
}

// 获取单个服务详情
export const getGigById = (id) => {
  return axios.get(`${API_URL}/${id}`)
}

// 发布新服务
export const createGig = (data) => {
  return axios.post(API_URL, data)
}