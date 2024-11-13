'use client'
import { LoginFormState  } from '@/states/LoginFormState'
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
  const [errors, setErrors] = useState({})
  const [isModalOpen, setModalOpen] = useState(false)

  const minPasswordLength = 10
  const maxPasswordLength = 14

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Formato de correo inválido'
    }
    if (
      formData.password.length < minPasswordLength ||
      formData.password.length > maxPasswordLength
    ) {
      newErrors.password = `La contraseña debe tener entre ${minPasswordLength} y ${maxPasswordLength} caracteres.`
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Formulario válido:', formData)
      setModalOpen(true) // Abre el modal al enviar el formulario
    }
  }

  const { turnOn } = LoginFormState()

  return (
    <div>
      <div className='flex items-center justify-center h-screen bg-gray-100'>
        <div className='w-[700px] p-8 bg-white shadow-md rounded-lg'>
          <h2 className='text-2xl font-bold text-center mb-6'>Registrarse</h2>
          <form onSubmit={handleSubmit}>
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
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
                  />
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
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none'
                  />
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
