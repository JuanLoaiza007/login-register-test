'use client'
import { useState, useEffect } from 'react'
import { useFilters } from '@/hooks/useFilters'
import { loadProducts } from '@/libs/api/productsApi'
import ProductCard from '@/components/products/ProductCard'
import { PRODUCT_ID } from '@/libs/api/Constants.js'
import LoadingOverlay from '@/components/ui/LoadingOverlay'

export default function ProductsGrid() {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true) // Comienza como true para mostrar el cargador inicialmente
  const productsPerPage = 6

  const { filterProducts } = useFilters()

  useEffect(() => {
    loadProducts().then((data) => {
      setProducts(data)
      setIsLoading(false)
    })
  }, []) // Solo se ejecuta una vez al montar el componente

  const filteredProducts = filterProducts(products)

  useEffect(() => {
    if (filteredProducts.length > 0) {
      const newTotalPages = Math.ceil(filteredProducts.length / productsPerPage)
      setTotalPages(newTotalPages)

      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages)
      }
    }
  }, [filteredProducts, currentPage])

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleProductClick = () => {
    setIsLoading(true) // Activar el cargador cuando se hace clic en un producto
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-full bg-gray-100'>
      {/* Círculo cargando que cubre toda la pantalla */}
      {isLoading && <LoadingOverlay />}

      <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-20'>
        {currentProducts.map((product) => (
          <div key={product[PRODUCT_ID]} onClick={handleProductClick}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

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
