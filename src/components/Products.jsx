'use client'
import { useState, useEffect } from 'react'
import { useFilters } from '@/hooks/useFilters'
import productsData from '@/mocks/products.json' // Importar los productos mockeados

export default function Products() {
  const [products, setProducts] = useState([])
  const [currentProduct, setCurrentProduct] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const productsPerPage = 6 // Aumentar los productos por página

  const { filterProducts } = useFilters() // Utilizar el hook de filtros

  // Obtener productos del archivo mock en lugar de la FakeAPI
  useEffect(() => {
    const data = productsData.products // Obtener productos del JSON
    setProducts(data)
  }, [])

  // Cambiar producto en el banner cada 10 segundos
  useEffect(() => {
    if (products.length > 0) {
      const interval = setInterval(() => {
        const randomProduct =
          products[Math.floor(Math.random() * products.length)]
        setCurrentProduct(randomProduct)
      }, 10000) // Cambiar cada 10 segundos

      return () => clearInterval(interval)
    }
  }, [products])

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
          <div
            key={product.id}
            className='bg-white p-4 rounded-md shadow-md h-[350px] overflow-hidden' // Tamaño fijo y truncamiento
          >
            <img
              src={product.thumbnail}
              className='w-full h-48 object-cover rounded-md mb-4'
            />
            <h3 className='text-lg font-bold truncate'>{product.title}</h3>
            <p className='text-gray-500 text-sm'>{product.category}</p>
            <p className='text-lg font-semibold mt-2'>{`$${product.price}`}</p>
          </div>
        ))}
      </div>
      {/* Paginación */}
      <div className='flex justify-center items-center mt-8'>
        <button
          className='px-4 py-2 bg-orange-500 text-white rounded-md mr-4'
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className='text-lg'>{`Página ${currentPage} de ${totalPages}`}</span>
        <button
          className='px-4 py-2 bg-orange-500 text-white rounded-md ml-4'
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}
