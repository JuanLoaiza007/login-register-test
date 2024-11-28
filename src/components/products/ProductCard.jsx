export default function ProductCard({ product }) {
  return (
    <div className='bg-white p-4 rounded-md shadow-md h-[350px] overflow-hidden'>
      <img
        src={product.thumbnail}
        className='w-full h-48 object-cover rounded-md mb-4'
        alt={product.title}
      />
      <h3 className='text-lg font-bold truncate'>{product.title}</h3>
      <p className='text-gray-500 text-sm'>{product.category}</p>
      <p className='text-lg font-semibold mt-2'>{`$${product.price}`}</p>
    </div>
  )
}
