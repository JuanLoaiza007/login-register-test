'use client'

export default function CategoryItem({ item }) {
  return (
    <div className='flex items-center bg-gray-100 p-4 rounded-md shadow-sm'>
      <div className='flex flex-col w-[100px] mr-4 '>
        <span className='text-gray-800'>{item.title}</span>
        <span className='text-gray-500'>{item.name.slice(0, 10)}</span>
      </div>
      <div className='flex flex-col'>
        <span className='text-gray-800 text-sm'>
          {item.description.slice(0, 40)}
        </span>
      </div>
    </div>
  )
}
