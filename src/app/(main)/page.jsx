import Link from 'next/link'
import React from 'react'
import { FaComputer, FaGears, FaSuperpowers } from 'react-icons/fa6'

const HomePage = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center gap-4 min-h-screen p-1 sm:p-4 max-w-5xl mx-auto'>
      <div className='w-full bg-white shadow-xl p-4 text-center rounded-xl flex flex-col items-center py-32 gap-6'>
        <h1 className='text-lg sm:text-2xl md:text-4xl font-semibold'>The Intelligent Core for Your Inventory Operations</h1>
        <p className='w-full text-center font-mono'>Eliminate stock discrepancies and streamline your supply chain with a custom-built, high-performance management system. Engineered with Next.js and PostgreSQL for unmatched speed and reliability</p>
        <div className='w-full flex flex-col md:flex-row items-center justify-center gap-4'>
          <Link href={'https://api.whatsapp.com/send/?phone=8801805003886&text&type=phone_number&app_absent=0'} className='w-full text-center shadow  bg-gray-50 p-1'>Inquire for Implementation</Link>
          <Link href={'/dashboard'} className='w-full text-center shadow bg-black text-white p-1 '>Go to dashboard</Link>
        </div>

      </div>
      <div className='w-full grid grid-cols-1 md:grid-cols-3 justify-items-center gap-4'>
        <div className='w-full bg-white shadow-xl p-4 text-center rounded-xl py-20 flex flex-col items-center gap-4'>
          <p className='text-4xl'><FaSuperpowers/></p>
          <p> Experience zero-latency updates. Our Express.js backend ensures that when an item moves in the warehouse, it moves on your screen instantly.</p>
        </div>
        <div className='w-full bg-white shadow-xl p-4 text-center rounded-xl py-20 flex flex-col items-center gap-4'>
          <p className='text-4xl'><FaComputer/></p>
          <p>Built on PostgreSQL, the system handles complex relationships between suppliers, SKUs, and locations with ACID-compliant stability.</p>
        </div>
        <div className='w-full bg-white shadow-xl p-4 text-center rounded-xl py-20 flex flex-col items-center gap-4'>
          <p className='text-4xl'><FaGears/></p>
          <p>Rest easy with robust authentication and granular permission levels. Your sensitive business data is protected by industry-standard encryption</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
