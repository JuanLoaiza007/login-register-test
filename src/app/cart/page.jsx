'use client'
import withAuth from '../_contexts/withAuth'

const CartPage = () => {
  return (
    <div className='flex flex-col h-full p-20 justify-normal items-center bg-gray-100'>
      <h2 className='text-3xl font-bold text-gray-800'>Carrito</h2>
    </div>
  )
}

export default withAuth(CartPage)
