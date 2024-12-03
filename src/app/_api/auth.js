import { api } from '@/app/_utils/api'

export const login = async (data) => {
  const response = await api.post('/auth/login', data)
  return response.data
}

export const registerUser = async (data) => {
  try {
    const response = await api.post('/auth/register/user', data)
    return response.data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      const errorMessage = JSON.parse(error.response.data.detail)
      if (
        errorMessage.email &&
        errorMessage.email.includes('user with this email already exists.')
      ) {
        throw new Error(
          'Este correo ya está registrado. Por favor, utiliza otro correo.'
        )
      }
    }
    throw new Error('Error al registrar. Intenta nuevamente.')
  }
}

export const registerWarehouseAssistant = async (data) => {
  const response = await api.post('/auth/register/warehouse-assistant', data)
  return response.data
}
