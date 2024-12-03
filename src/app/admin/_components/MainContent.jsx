'use client'
import { useState } from 'react'
import { ReactSVG } from 'react-svg'
import ic from '@/app/_config/assets.json'

export default function MainContent({ items, ItemComponent }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 // Número de elementos por página

  // Calcular los elementos a mostrar en la página actual
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = items.slice(startIndex, endIndex)

  // Calcular el total de páginas
  const totalPages = Math.ceil(items.length / itemsPerPage)

  // Cambiar página
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className='flex-1 bg-white p-6 relative'>
      {/* Barra de búsqueda */}
      <div className='flex items-center bg-gray-100 rounded-md px-4 py-2 mb-6'>
        <input
          type='text'
          placeholder='Buscar...'
          className='flex-1 bg-transparent outline-none text-gray-700'
        />
      </div>

      {/* Lista de elementos */}
      <div className='space-y-4'>
        {currentItems.map((item) => (
          <ItemComponent key={item.key} item={item} />
        ))}
      </div>

      {/* Controles de paginación */}
      <div className='flex items-center mt-6'>
        <button
          className={`p-2 mx-2 bg-orange-500 rounded-md ${
            currentPage === 1
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-orange-700'
          }`}
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ReactSVG
            className='fill-none text-white hover:fill-black'
            src={ic.ui.arrowLeft}
            alt='arrow-left'
            width={24}
            height={24}
          />
        </button>
        <span className='text-gray-700'>{`Página ${currentPage} de ${totalPages}`}</span>
        <button
          className={`p-2 mx-2 bg-orange-500 rounded-md ${
            currentPage === totalPages
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-orange-700'
          }`}
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ReactSVG
            className='fill-none text-white hover:fill-black'
            src={ic.ui.arrowRight}
            alt='arrow-right'
            width={24}
            height={24}
          />
        </button>
      </div>

      {/* Botón flotante */}
      <button className='fixed bottom-6 right-6 bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-orange-600'>
        +
      </button>
    </div>
  )
}
