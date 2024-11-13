'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { useAppInfoState } from '@/states/AppInfoState'
import { useSidebarState } from '@/states/SidebarState'
import { useFilters } from '@/hooks/useFilters'

export default function Navbar() {
  const { companyName } = useAppInfoState()
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const dropdownTimeout = useRef(null)
  const { isOpen, setIsOpen } = useSidebarState()

  const { filters, setFilters } = useFilters()

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimeout.current)
    setDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150)
  }

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      includedString: e.target.value
    }))
  }

  return (
    <nav className='fixed top-0 left-0 w-full z-50 flex items-center px-6 py-4 bg-orange-500 shadow-md'>
      {/* Logo o nombre de la empresa */}
      <div className='text-xl font-bold text-white mr-6'>
        <Link href='/'>{companyName}</Link>
      </div>

      {/* Botón de Menú */}
      <button
        className='flex items-center space-x-2 text-white hover:text-gray-900 transition mr-6'
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='2'
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4 6h16M4 12h16m-7 6h7'
          />
        </svg>
        <span>Menú</span>
      </button>

      {/* Barra de búsqueda */}
      <div className='flex items-center flex-grow mr-6'>
        <input
          type='text'
          value={filters.includedString} // Vinculamos el valor del input con el filtro de búsqueda
          onChange={handleSearchChange} // Actualizamos el filtro cuando cambia el valor
          placeholder='Buscar...'
          className='w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500'
        />
        {/* <button className='bg-black text-white px-4 py-3 rounded-r-md'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M11 16a7 7 0 100-14 7 7 0 000 14zM21 21l-4.35-4.35'
            />
          </svg>
        </button> */}
      </div>

      {/* Espacio de inicio de sesión con menú desplegable */}
      <div
        className='relative text-white hover:text-gray-900 transition mr-6'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <p>Hola, Inicia sesión</p>
        {isDropdownOpen && (
          <div className='absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-2 transition-all duration-200 transform scale-95'>
            <Link
              href='#'
              onClick={() => {}}
              className='block px-4 py-2 hover:bg-gray-100'
            >
              Iniciar sesión
            </Link>
            <Link
              href='/register'
              className='block px-4 py-2 hover:bg-gray-100'
            >
              Registrarse
            </Link>
            <Link href='/logout' className='block px-4 py-2 hover:bg-gray-100'>
              Cerrar Sesión
            </Link>
          </div>
        )}
      </div>

      {/* Icono del carrito */}
      <div className='mr-6'>
        <Link
          href='/carrito'
          className='text-white hover:text-gray-900 transition'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1 5h12l-1-5m-6 5a2 2 0 11-4 0m6 0a2 2 0 104 0'
            />
          </svg>
        </Link>
      </div>
    </nav>
  )
}
