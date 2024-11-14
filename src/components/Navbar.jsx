'use client'
import { useState, useRef } from 'react'
import { ReactSVG } from 'react-svg'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import ic from '@/config/assets.json'
import { useAppInfoState } from '@/states/AppInfoState'
import { useSidebarState } from '@/states/SidebarState'
import { useLoginModalState } from '@/states/LoginFormState'
import { useFilters } from '@/hooks/useFilters'

export default function Navbar() {
  const { companyName } = useAppInfoState()
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const dropdownTimeout = useRef(null)
  const { turnOn: turnOnLoginModal } = useLoginModalState()
  const { isOpen, setIsOpen } = useSidebarState()

  const { filters, setFilters } = useFilters()

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimeout.current)
    setDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150)
  }

  const handleSearchChange = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      includedString: e.target.value
    }))
  }

  function logout() {
    return () => {
      console.log('Cerrando sesión')
    }
  }

  const pathname = usePathname()
  console.log('pathname', pathname)

  return (
    <nav className='fixed top-0 left-0 w-full z-50 flex items-center px-6 py-4 bg-orange-500 shadow-md h-16'>
      {/* company name */}
      <div className='text-xl font-bold text-white mr-6'>
        <Link href='/'>{companyName}</Link>
      </div>
      {/* menu button */}
      {pathname === '/' && (
        <>
          <button
            className='flex items-center space-x-2 text-white hover:text-gray-900 transition mr-6'
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          >
            <ReactSVG
              className='fill-none text-white hover:text-gray-900 transition'
              src={ic.ui.menu}
              alt='menu'
            />
          </button>

          {/* search bar */}
          <div className='flex items-center flex-grow mr-6'>
            <input
              type='text'
              value={filters.includedString}
              onChange={handleSearchChange}
              placeholder='Buscar...'
              className='w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500'
            />
          </div>
        </>
      )}
      {/* session button */}
      <div
        className='relative text-white hover:text-gray-900 transition ml-auto mr-6'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <p>Hola, Inicia sesión</p>
        {isDropdownOpen && (
          <div className='absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-2 transition-all duration-200 transform scale-95'>
            <Link
              href='#'
              onClick={() => {
                turnOnLoginModal()
              }}
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
            <Link
              href='/'
              onClick={logout()}
              className='block px-4 py-2 hover:bg-gray-100'
            >
              Cerrar Sesión
            </Link>
          </div>
        )}
      </div>
      {/* cart button */}
      <div className='mr-6'>
        <Link
          href='/cart'
          className='text-white hover:text-gray-900 transition'
        >
          <ReactSVG
            className='text-white fill-none hover:fill-black'
            src={ic.ui.cart}
            alt='cart-button'
          />
        </Link>
      </div>
    </nav>
  )
}
