'use client'
import AddBrandForm from '@/components/forms/AddBrandForm'
import AddCategoryForm from '@/components/forms/AddCategoryForm'
import AddProductForm from '@/components/forms/AddProductForm'
import { Context } from '@/components/helper/Context'
import React, { useContext } from 'react'

const NewProductPage = () => {
  const { isCategoryBox, isBrandBox } = useContext(Context)
  return (
    <div className='w-full p-1 sm:p-4 relative'>


      {
        isCategoryBox === true && <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'>
          <div className='bg-white p-2 rounded-2xl'>
            <AddCategoryForm />
          </div>
        </div>
      }
      {
        isBrandBox === true && <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'>
          <div className='bg-white p-2 rounded-2xl'>
            <AddBrandForm />

          </div>
        </div>
      }
      <AddProductForm />
    </div>
  )
}

export default NewProductPage
