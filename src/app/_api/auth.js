import { api } from '@/app/_utils/api'

export const login = async (data) => {
  const response = await api.post('/auth/login', data)
  return response.data
}

export const registerUser = async (data) => {
  const response = await api.post('/auth/register/user', data)
  return response.data
}

export const registerWarehouseAssistant = async (data) => {
  const response = await api.post('/auth/register/warehouse-assistant', data)
  return response.data
}
