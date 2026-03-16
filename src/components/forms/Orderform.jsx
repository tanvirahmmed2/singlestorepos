'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../helper/Context'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { 
  FiShoppingBag, FiUser, FiTrash2, FiMinus, 
  FiPlus, FiTag, FiCreditCard, FiLoader, FiZap 
} from 'react-icons/fi'

const payment_method_options = ['cash', 'bkash', 'nagad', 'card']

const SalesForm = () => {
  const { 
    cart, addToCart, removeFromCart, clearCart, decreaseCartQuantity, staff 
  } = useContext(Context)
  const router = useRouter()

  // --- States ---
  const [saleType, setSaleType] = useState('retail') // retail or wholesale
  const [isPaymentModal, setIsPaymentModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [receivedAmount, setReceivedAmount] = useState(0)
  
  const [formData, setFormData] = useState({
    customer_phone: '',
    manual_discount: 0,
    payment_method: 'cash',
    transaction_id: '',
    notes: ''
  })

  const cartItems = cart?.items || []

  // --- Calculations ---
  
  // 1. Subtotal: Based on the saleType (Retail Price or Wholesale Price)
  const subTotal = cartItems.reduce((acc, item) => {
    const price = saleType === 'retail' ? item.sale_price : item.wholesale_price
    return acc + (Number(price) * item.quantity)
  }, 0)

  // 2. Auto-Discount: Sum of product-level discounts (Retail only)
  const autoDiscount = saleType === 'retail' 
    ? cartItems.reduce((acc, item) => acc + (Number(item.discount_price || 0) * item.quantity), 0)
    : 0

  // 3. Manual Discount & Grand Total
  const manualDiscount = Number(formData.manual_discount) || 0
  const grandTotal = Math.max(0, subTotal - autoDiscount - manualDiscount)
  const changeAmount = Math.max(0, (Number(receivedAmount) || 0) - grandTotal)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSaleTypeChange = (type) => {
    setSaleType(type)
    toast.info(`Switched to ${type.toUpperCase()} pricing`)
  }

  const handleSubmitRequest = (e) => {
    e.preventDefault()
    if (cartItems.length === 0) return toast.error("Cart is empty")
    if (!formData.customer_phone) return toast.error("Customer phone is required")
    
    setReceivedAmount(grandTotal) // Default received to grand total
    setIsPaymentModal(true)
  }

  const finalizeSale = async () => {
    setLoading(true)
    try {
      const payload = {
        branch_id: staff?.branch_id,
        staff_id: staff?.staff_id,
        customer_phone: formData.customer_phone,
        total_amount: subTotal,
        discount_amount: autoDiscount + manualDiscount,
        grand_total: grandTotal,
        payment_method: formData.payment_method,
        transaction_id: formData.transaction_id,
        notes: formData.notes,
        sale_type: saleType,
        items: cartItems.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: saleType === 'retail' ? item.sale_price : item.wholesale_price
        }))
      }

      const res = await axios.post('/api/sales', payload)
      
      if (res.status === 201) {
        toast.success("Sale completed successfully!")
        clearCart()
        setIsPaymentModal(false)
        setFormData({ customer_phone: '', manual_discount: 0, payment_method: 'cash', transaction_id: '', notes: '' })
        // Optional: router.push(`/dashboard/invoice/${res.data.invoice_no}`)
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Transaction failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full max-w-4xl mx-auto flex flex-col gap-6 p-6 bg-white shadow-xl rounded-4xl border border-slate-100'>
      
      {/* Header & Sale Type Toggle */}
      <div className='flex flex-col md:flex-row justify-between items-center gap-4 border-b pb-6'>
        <div className='flex items-center gap-3'>
          <div className='p-3 bg-slate-900 text-white rounded-2xl shadow-lg'><FiShoppingBag size={24}/></div>
          <div>
            <h2 className='text-2xl font-black text-slate-800 tracking-tight'>SALES TERMINAL</h2>
            <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>Branch: {staff?.branch_name || 'Main'}</p>
          </div>
        </div>

        <div className='flex bg-slate-100 p-1.5 rounded-2xl w-full md:w-auto shadow-inner'>
          <button 
            onClick={() => handleSaleTypeChange('retail')}
            className={`flex-1 md:w-32 py-2 rounded-xl text-xs font-black uppercase transition-all ${saleType === 'retail' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400'}`}
          >
            Retail
          </button>
          <button 
            onClick={() => handleSaleTypeChange('wholesale')}
            className={`flex-1 md:w-32 py-2 rounded-xl text-xs font-black uppercase transition-all ${saleType === 'wholesale' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400'}`}
          >
            Wholesale
          </button>
        </div>
      </div>

      {/* Customer Info */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex flex-col gap-2'>
          <label className='text-[10px] font-black text-slate-400 uppercase ml-2'>Customer Phone</label>
          <div className='relative'>
            <FiUser className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-300' />
            <input 
              type="text" 
              name="customer_phone"
              placeholder="017XXXXXXXX"
              value={formData.customer_phone}
              onChange={handleInputChange}
              className='w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-slate-900 rounded-2xl outline-none font-black text-lg transition-all'
            />
          </div>
        </div>
        <div className='flex flex-col justify-end'>
          <div className='bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-center justify-between'>
            <span className='text-[10px] font-black text-blue-400 uppercase'>Current Cart</span>
            <span className='text-xl font-black text-blue-700'>{cartItems.length} Items</span>
          </div>
        </div>
      </div>

      {/* Cart Table */}
      <div className='border-2 border-slate-50 rounded-4xl overflow-hidden shadow-sm'>
        <table className='w-full text-left'>
          <thead>
            <tr className='bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b'>
              <th className='p-5'>Item Name</th>
              <th className='p-5 text-center'>Price</th>
              <th className='p-5 text-center'>Quantity</th>
              <th className='p-5 text-right'>Total</th>
              <th className='p-5'></th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-50'>
            {cartItems.map((item) => {
              const currentPrice = saleType === 'retail' ? item.sale_price : item.wholesale_price
              return (
                <tr key={item.product_id} className='hover:bg-slate-50/50 font-bold text-sm'>
                  <td className='p-5 text-slate-800'>{item.name}</td>
                  <td className='p-5 text-center text-slate-500'>৳{currentPrice}</td>
                  <td className='p-5'>
                    <div className='flex items-center justify-center gap-3'>
                      <button onClick={() => decreaseCartQuantity(item.product_id)} className='p-1.5 bg-slate-100 rounded-lg hover:bg-slate-200'><FiMinus/></button>
                      <span className='w-8 text-center text-lg font-black'>{item.quantity}</span>
                      <button onClick={() => addToCart(item)} className='p-1.5 bg-slate-100 rounded-lg hover:bg-slate-200'><FiPlus/></button>
                    </div>
                  </td>
                  <td className='p-5 text-right font-black text-slate-900'>৳{(currentPrice * item.quantity).toFixed(2)}</td>
                  <td className='p-5 text-right'>
                    <button onClick={() => removeFromCart(item.product_id)} className='text-slate-300 hover:text-red-500 transition-colors'>
                      <FiTrash2 size={20}/>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      

      {/* Summary Area */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-start'>
        <textarea 
          name="notes" 
          placeholder="Add sale notes..." 
          onChange={handleInputChange} 
          className='bg-slate-50 border-2 border-transparent focus:border-slate-100 p-5 rounded-4xl h-32 text-sm outline-none font-medium' 
        />
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2 px-2'>
            <div className='flex justify-between font-bold text-slate-400'>
              <span className='text-xs uppercase'>Subtotal</span>
              <span>৳{subTotal.toFixed(2)}</span>
            </div>
            {autoDiscount > 0 && (
              <div className='flex justify-between font-bold text-green-500'>
                <span className='text-xs uppercase'>Item Discount</span>
                <span>-৳{autoDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className='flex justify-between items-center bg-red-50 p-4 rounded-2xl border border-red-100'>
              <span className='text-[10px] font-black text-red-400 uppercase flex items-center gap-1'><FiTag/> Manual Disc</span>
              <input 
                type="number" 
                name="manual_discount" 
                onChange={handleInputChange} 
                className='w-24 text-right font-black text-red-600 bg-transparent outline-none' 
                placeholder="0.00" 
              />
            </div>
          </div>
          <button 
            onClick={handleSubmitRequest}
            disabled={cartItems.length === 0}
            className='w-full py-6 bg-slate-900 text-white font-black text-2xl rounded-4xl hover:bg-black shadow-xl shadow-slate-200 active:scale-[0.98] transition-all disabled:opacity-20'
          >
            CHECKOUT ৳{grandTotal.toLocaleString()}
          </button>
        </div>
      </div>

      {/* Final Payment Modal */}
      {isPaymentModal && (
        <div className='fixed inset-0 flex items-center justify-center z- p-4 animate-in fade-in duration-200'>
          <div className='absolute inset-0 bg-slate-900/60 backdrop-blur-md' onClick={() => setIsPaymentModal(false)}></div>
          <div className='relative bg-white p-10 rounded-[3rem] shadow-2xl w-full max-w-md flex flex-col gap-6'>
            <div className='text-center'>
                <h3 className='text-2xl font-black text-slate-900 uppercase tracking-tight'>Confirm Sale</h3>
                <p className='text-xs font-bold text-slate-400 uppercase tracking-widest mt-1'>Review Payment Details</p>
            </div>
            
            <div className='bg-slate-50 p-6 rounded-[2.5rem] text-center border-2 border-dashed border-slate-200'>
                <p className='text-[10px] text-slate-400 font-black uppercase mb-1'>Net Payable</p>
                <p className='text-5xl font-black text-slate-900 tracking-tighter'>৳{grandTotal.toLocaleString()}</p>
            </div>
            
            <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col gap-2'>
                    <label className='text-[10px] font-black text-slate-400 uppercase ml-2'>Method</label>
                    <select name="payment_method" onChange={handleInputChange} value={formData.payment_method} className='w-full border-2 border-slate-100 p-4 rounded-2xl font-black bg-slate-50 outline-none focus:border-slate-900 transition-all'>
                      {payment_method_options.map(m => <option key={m} value={m}>{m.toUpperCase()}</option>)}
                    </select>
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-[10px] font-black text-slate-400 uppercase ml-2'>Received Cash</label>
                    <input 
                      type="number" 
                      autoFocus
                      onFocus={(e) => e.target.select()}
                      value={receivedAmount}
                      onChange={(e) => setReceivedAmount(e.target.value)} 
                      className='w-full border-2 border-slate-100 p-4 rounded-2xl font-black bg-slate-50 outline-none focus:border-slate-900 transition-all text-center' 
                    />
                </div>
            </div>

            <div className='bg-green-50 p-4 rounded-2xl flex justify-between items-center border border-green-100'>
                <span className='text-xs font-black text-green-600 uppercase'>Return Change</span>
                <span className='text-2xl font-black text-green-700 uppercase font-mono'>৳{changeAmount.toFixed(2)}</span>
            </div>

            <button 
              onClick={finalizeSale} 
              disabled={loading}
              className='w-full bg-slate-900 text-white py-6 rounded-4xl font-black text-xl shadow-xl hover:bg-black flex items-center justify-center gap-3 transition-all'
            >
              {loading ? <FiLoader className='animate-spin' /> : <><FiZap /> FINALIZE SALE</>}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SalesForm