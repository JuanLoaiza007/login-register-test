'use client'
import { useLoginModalState } from '@/states/LoginFormState'
import { useState } from 'react'
import { validateEmail, validatePassword } from '@/utils/validations' // Importar las funciones de validación
import Link from 'next/link'

export default function LoginModal() {
  const { isModalOpen, turnOff } = useLoginModalState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const closeModal = () => turnOff()

  const handleEmailChange = (e) => {
    const emailValue = e.target.value
    setEmail(emailValue)
    const error = validateEmail(emailValue) // Llamada a la validación de correo
    setEmailError(error)
  }

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value
    setPassword(passwordValue)
    const error = validatePassword(passwordValue) // Llamada a la validación de contraseña
    setPasswordError(error)
  }

  return (
    <>
      {isModalOpen && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50'>
          <div className='relative w-[400px] p-8 bg-white shadow-md rounded-lg text-center'>
            {/* Título del formulario */}
            <h2 className='text-2xl font-bold mb-6'>Iniciar sesión</h2>

            {/* Formulario de login */}
            <form>
              <div className='mb-4 text-left'>
                <label className='block font-semibold mb-1'>Correo</label>
                <input
                  type='email'
                  value={email}
                  onChange={handleEmailChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
                  required
                />
                {emailError && (
                  <p className='text-red-500 text-xs mt-1'>{emailError}</p>
                )}
              </div>

              <div className='mb-4 text-left'>
                <label className='block font-semibold mb-1'>Contraseña</label>
                <input
                  type='password'
                  value={password}
                  onChange={handlePasswordChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
                  required
                />
                {passwordError && (
                  <p className='text-red-500 text-xs mt-1'>{passwordError}</p>
                )}
              </div>

              <button
                type='submit'
                className='w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition'
              >
                Iniciar sesión
              </button>
              <p className='mt-4 text-sm'>
                ¿No tienes cuenta?{' '}
                <Link
                  href='/register'
                  onClick={closeModal}
                  className='text-blue-500'
                >
                  Regístrate
                </Link>
              </p>
            </form>

            {/* Botón de cerrar dentro del card */}
            <button
              onClick={closeModal}
              className='absolute top-2 right-2 text-gray-500 hover:text-red-700 text-3xl'
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  )
}
