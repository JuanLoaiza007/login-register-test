'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  const [products, setProducts] = useState([])
  const [currentProduct, setCurrentProduct] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const productsPerPage = 6 // Aumentar los productos por página

  // Obtener productos de la FakeAPI
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('https://fakestoreapi.com/products')
      const data = await res.json()
      setProducts(data)
      setTotalPages(Math.ceil(data.length / productsPerPage))
    }
    fetchProducts()
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

  // Función para cambiar de página
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // Obtener los productos de la página actual
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
      {/* Banner con el producto y fondo de imagen con blur */}
      {currentProduct && (
        <div
          className='relative w-full h-96 mb-8 bg-cover bg-center'
          style={{ backgroundImage: `url(${currentProduct.image})` }}
        >
          <div className='absolute inset-0 bg-black opacity-50' />{' '}
          {/* Fondo negro translúcido */}
          <div className='absolute inset-0 flex justify-center items-center text-center text-white px-4'>
            <div>
              <h2 className='text-3xl font-bold mb-4'>
                {currentProduct.title}
              </h2>
              <p className='text-xl mb-6'>{currentProduct.description}</p>
              <button className='bg-orange-500 text-white py-2 px-6 rounded-md'>
                Ver Producto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contenedor paginado con productos */}
      <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-6'>
        {currentProducts.map((product) => (
          <div key={product.id} className='bg-white p-4 rounded-md shadow-md'>
            <img
              src={product.image}
              alt={product.title}
              className='w-full h-48 object-cover rounded-md mb-4'
            />
            <h3 className='text-lg font-bold'>{product.title}</h3>
            <p className='text-gray-500'>{product.category}</p>
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
