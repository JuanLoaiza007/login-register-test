'use client'
import { useState, useEffect } from 'react'
import { useFilters } from '@/hooks/useFilters'
import { loadProducts } from '@/libs/api/productsApi'
import ProductCard from '@/components/products/ProductCard'
import { PRODUCT_ID } from '@/libs/api/Constants.js'

export default function ProductsGrid() {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const productsPerPage = 6

  const { filterProducts } = useFilters()

  // Cargar productos al montar el componente
  useEffect(() => {
    loadProducts().then((data) => {
      setProducts(data)
    })
  }, []) // Solo se ejecuta una vez al montar el componente

  // Aplicar los filtros a los productos
  const filteredProducts = filterProducts(products)

  // Actualizar el total de páginas solo cuando los productos y filtros cambian
  useEffect(() => {
    if (filteredProducts.length > 0) {
      const newTotalPages = Math.ceil(filteredProducts.length / productsPerPage)
      setTotalPages(newTotalPages)

      // Si la página actual está fuera de rango después de aplicar los filtros, ajustarla
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages)
      }
    }
  }, [filteredProducts, currentPage])

  // Obtener los productos de la página actual después de filtrar
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  // Función para cambiar de página
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
      {/* Contenedor paginado con productos filtrados */}
      <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-6'>
        {currentProducts.map((product) => (
          <ProductCard key={product[PRODUCT_ID]} product={product} />
        ))}
      </div>
      {/* Paginación */}
      <div className='flex justify-center items-center mt-8'>
        <button
          className='px-4 py-2 bg-orange-500 text-white rounded-md mr-4'
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1 || totalPages === 0}
        >
          Anterior
        </button>
        <span className='text-lg'>{`Página ${currentPage} de ${totalPages}`}</span>
        <button
          className='px-4 py-2 bg-orange-500 text-white rounded-md ml-4'
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}
