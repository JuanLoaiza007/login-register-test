import Link from 'next/link'
import {
  PRODUCT_THUMBNAIL,
  PRODUCT_TITLE,
  PRODUCT_CATEGORY,
  PRODUCT_PRICE
} from '@/app/api/Constants.js'

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className='bg-white p-4 rounded-md shadow-md h-[350px] overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl'>
        <img
          src={product[PRODUCT_THUMBNAIL]}
          className='w-full h-48 object-cover rounded-md mb-4'
          alt={product[PRODUCT_TITLE]}
        />
        <h3 className='text-lg font-bold truncate'>{product[PRODUCT_TITLE]}</h3>
        <p className='text-gray-500 text-sm'>{product[PRODUCT_CATEGORY]}</p>
        <p className='text-lg font-semibold mt-2'>{`$${product[PRODUCT_PRICE]}`}</p>
      </div>
    </Link>
  )
}
