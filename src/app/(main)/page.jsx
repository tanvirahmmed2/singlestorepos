import Link from 'next/link'
import React from 'react'
import { LayoutDashboard, MessageSquareCode, ShieldCheck, Zap, Database } from 'lucide-react'

const HomePage = () => {
  return (
    <div className='w-full min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100'>
      <div className='max-w-6xl mx-auto flex flex-col items-center justify-center gap-8 p-6 py-20'>
        
        {/* Main Hero Section */}
        <div className='w-full bg-white border border-slate-200 shadow-2xl shadow-slate-200/50 p-8 md:p-12 text-center rounded-3xl flex flex-col items-center transition-all'>
          <div className='inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-600 mb-6 border border-indigo-100'>
            v2.0 Now Live
          </div>
          <h1 className='text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6'>
            The Intelligent Core for Your <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600'>Inventory Operations</span>
          </h1>
          <p className='max-w-2xl text-lg text-slate-600 leading-relaxed mb-10'>
            Eliminate stock discrepancies and streamline your supply chain with a custom-built, high-performance management system. Engineered with Next.js and PostgreSQL for unmatched speed and reliability.
          </p>
          
          <div className='flex flex-wrap justify-center gap-4'>
            <Link 
              href={'/dashboard'} 
              className='flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 hover:-translate-y-1 transition-all shadow-lg shadow-slate-200'
            >
              <LayoutDashboard size={20} />
              Go to Dashboard
            </Link>
            <Link 
              href={'https://api.whatsapp.com/send/?phone=8801805003886'} 
              className='flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm'
            >
              <MessageSquareCode size={20} />
              Inquire for Implementation
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='group bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all'>
            <div className='w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
              <Zap className='text-amber-600' />
            </div>
            <h3 className='font-bold text-xl mb-3 text-slate-800'>Zero-Latency Updates</h3>
            <p className='text-slate-500 leading-relaxed'>
              Our Express.js backend ensures real-time sync. When an item moves in the warehouse, it moves on your screen instantly.
            </p>
          </div>

          <div className='group bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all'>
            <div className='w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
              <Database className='text-indigo-600' />
            </div>
            <h3 className='font-bold text-xl mb-3 text-slate-800'>ACID Compliance</h3>
            <p className='text-slate-500 leading-relaxed'>
              Built on PostgreSQL to handle complex relationships between suppliers, SKUs, and locations with enterprise stability.
            </p>
          </div>

          <div className='group bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all'>
            <div className='w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
              <ShieldCheck className='text-emerald-600' />
            </div>
            <h3 className='font-bold text-xl mb-3 text-slate-800'>Granular Security</h3>
            <p className='text-slate-500 leading-relaxed'>
              Rest easy with robust authentication and hierarchical permissions. Your data is protected by industry-standard encryption.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage