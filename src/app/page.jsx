'use client'
import { LoginFormState } from '@/states/LoginFormState'

export default function Home () {
  const { turnOn } = LoginFormState()

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-100'>
      <h1 className='text-4xl font-bold mb-8'>
        Bienvenido a la Página de Inicio
      </h1>
      <p className='text-lg mb-4'>
        Aquí puedes encontrar contenido adicional de ejemplo.
      </p>

      <button
        onClick={turnOn}
        className='px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition mb-8'
      >
        Abrir Modal de Login
      </button>
    </div>
  )
}
