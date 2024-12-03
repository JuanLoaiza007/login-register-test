'use client'

export default function BrandItem({ item }) {
  return (
    <div className='p-3 flex bg-gray-100 p-2 rounded-md shadow-sm'>
      <div className='flex flex-col w-[130px] items-center justify-center bg-orange-700 text-white p-1 rounded-md mr-4'>
        <span className='text-lg font-bold'>{item.name.slice(0, 14)}</span>
      </div>
      <div className='flex justify-center items-center text-sm'>
        <span className=''>{item.description.slice(0, 40)}</span>
      </div>
    </div>
  )
}
