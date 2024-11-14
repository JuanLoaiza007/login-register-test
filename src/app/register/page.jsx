'use client'
import { useLoginModalState } from '@/states/LoginFormState'
import {
  validateEmail,
  validatePassword,
  validateDocument,
  validatePhone
} from '@/utils/validations'
import { useState } from 'react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    id: '',
    birthdate: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: ''
  })
  const { isModalOpen, turnOn } = useLoginModalState()
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    const emailError = validateEmail(formData.email)
    if (emailError) {
      newErrors.email = emailError
    }

    const passwordError = validatePassword(formData.password)
    if (passwordError) {
      newErrors.password = passwordError
    }

    const documentError = validateDocument(formData.id)
    if (documentError) {
      newErrors.id = documentError
    }

    const phoneError = validatePhone(formData.phone)
    if (phoneError) {
      newErrors.phone = phoneError
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
    validateForm()
  }

  // Función para permitir solo números en campos específicos
  const handleNumberInput = (e) => {
    const { name, value } = e.target
    const numericValue = value.replace(/\D/g, '') // Elimina caracteres no numéricos
    setFormData((prevData) => ({ ...prevData, [name]: numericValue }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Formulario válido:', formData)
    }
  }

  return (
    <div>
      <div className='flex items-center justify-center h-screen bg-gray-100'>
        <div className='w-[700px] p-8 bg-white shadow-md rounded-lg'>
          <h2 className='text-2xl font-bold text-center mb-6'>Registrarse</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className='grid grid-cols-2 gap-6'>
              <div>
                <p className='font-semibold mb-4 text-orange-500'>
                  Datos personales
                </p>
                <div className='mb-4'>
                  <label className='block font-semibold mb-1'>
                    Documento de identidad
                  </label>
                  <input
                    type='text'
                    name='id'
                    value={formData.id}
                    onChange={handleNumberInput} // Solo permite números
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
                  />
                  {errors.id && (
                    <p className='text-red-500 text-xs mt-1'>{errors.id}</p>
                  )}
                </div>
                <div className='mb-4'>
                  <label className='block font-semibold mb-1'>
                    Fecha de nacimiento
                  </label>
                  <input
                    type='date'
                    name='birthdate'
                    value={formData.birthdate}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
                  />
                </div>
                <div className='mb-4'>
                  <label className='block font-semibold mb-1'>Nombres</label>
                  <input
                    type='text'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
                  />
                </div>
                <div className='mb-4'>
                  <label className='block font-semibold mb-1'>Apellidos</label>
                  <input
                    type='text'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
                  />
                </div>
              </div>
              <div>
                <p className='font-semibold mb-4 text-orange-500'>
                  Datos de cuenta
                </p>
                <div className='mb-4'>
                  <label className='block font-semibold mb-1'>Celular</label>
                  <input
                    type='text'
                    name='phone'
                    value={formData.phone}
                    onChange={handleNumberInput} // Solo permite números
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
                  />
                  {errors.phone && (
                    <p className='text-red-500 text-xs mt-1'>{errors.phone}</p>
                  )}
                </div>
                <div className='mb-4'>
                  <label className='block font-semibold mb-1'>Correo</label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
                  />
                  {errors.email && (
                    <p className='text-red-500 text-xs mt-1'>{errors.email}</p>
                  )}
                </div>
                <div className='mb-4'>
                  <label className='block font-semibold mb-1'>Contraseña</label>
                  <input
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
                  />
                  {errors.password && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <button
              type='submit'
              className='w-full py-2 mt-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition'
            >
              Registrarse
            </button>
            <p className='mt-4 text-center text-sm'>
              ¿Ya tienes una cuenta?{' '}
              <button
                onClick={() => {
                  turnOn()
                  console.log('Abriendo modal de login')
                }}
                type='button'
                className='text-blue-500'
              >
                Inicia sesión
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
