'use client'

import Cookies from 'js-cookie'
import { redirect } from 'next/navigation'
import { login } from '@/app/_api/auth'

export const isAuthenticated = () => {
  const token = Cookies.get('frontend_access_token')
  const isValid = Boolean(token)
  return isValid
}

export const handleLogin = async (email, password, setLoginError) => {
  try {
    if (!email || !password) {
      setLoginError('Por favor ingresa un correo y una contraseña.')
      return
    }

    const response = await login({ email, password })
    const { access_token } = response

    Cookies.set('frontend_access_token', access_token.access, {
      path: '/',
      secure: true,
      sameSite: 'strict',
      expires: 365 * 5
    })

    console.log('Inicio de sesión exitoso:', response)

    if (window.location.pathname === '/') {
      window.location.reload()
    } else {
      redirect('/')
    }
  } catch (error) {
    setLoginError('Credenciales incorrectas. Intenta nuevamente.')
    console.error(error)
  }
}

export const handleLogout = () => {
  return () => {
    const cookies = document.cookie.split(';')
    cookies.forEach((cookie) => {
      const cookieName = cookie.split('=')[0].trim()
      Cookies.remove(cookieName)
    })

    if (window.location.pathname === '/') {
      window.location.reload()
    } else {
      redirect('/')
    }
  }
}
