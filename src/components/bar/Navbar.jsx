'use client'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full relative'>
      <nav className='w-full flex text-xs sm:text-base flex-row bg-white items-center justify-between fixed top-0 right-0 h-14 px-4 shadow z-50'>
        <Link href={'/'} className='text-lg sm:text-2xl font-semibold'>Store Management</Link>
        <div className='w-auto flex flex-row items-center justify-center gap-4'>
          <Link href={'https://api.whatsapp.com/send/?phone=8801805003886&text&type=phone_number&app_absent=0'}>Discuss</Link>
          <Link href={'/access'}>Go to Dashboard</Link>
        </div>


      </nav>

    </div>
  )
}

export default Navbar