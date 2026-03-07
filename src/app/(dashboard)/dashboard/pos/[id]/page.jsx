'use client'
import axios from 'axios'
import React, { use, useEffect, useState } from 'react'

const POSSLIPPAGE = ({ params }) => {
    const { id } = use(params)
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(`/api/order/${id}`, { withCredentials: true })
                setOrder(res.data.payload)
            } catch (error) {
                console.error(error)
                setOrder(null)
            } finally {
                setLoading(false)
            }
        }
        fetchOrder()
    }, [id])

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-stone-50">
            <p className="text-xs uppercase tracking-widest text-gray-400">Loading slip…</p>
        </div>
    )

    if (!order) return (
        <div className="flex h-screen items-center justify-center bg-stone-50">
            <p className="text-xs uppercase tracking-widest text-red-400">Slip not found</p>
        </div>
    )

    const orderDate = new Date(order.created_at)
    const formattedDate = orderDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    const formattedTime = orderDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

    return (
        <div className="min-h-screen bg-stone-50 flex items-start justify-center py-10 px-4">
            <div className="w-full max-w-sm bg-white px-7 py-8">

                {/* HEADER */}
                <div className="text-center pb-5 border-b-2 border-gray-900 mb-5">
                    <h1 className="text-2xl font-serif font-bold text-gray-900 tracking-tight">Nizam Varieties</h1>
                    <p className="text-[9px] uppercase tracking-[3px] text-gray-400 mt-1 mb-1">General Store</p>
                    <p className="text-[11px] font-mono text-gray-400 mb-3">Pakuritala Bazar, Tarakanda · 01645-172356</p>
                    <p className="text-[9px] font-bold uppercase tracking-[3px] text-gray-500">— Sales Receipt —</p>
                </div>

                {/* META */}
                <div className="pb-3 border-b border-dashed border-gray-300 mb-3 space-y-1">
                    <div className="flex justify-between items-baseline">
                        <span className="text-[9px] uppercase tracking-widest text-gray-400">Receipt No.</span>
                        <span className="font-mono text-[11px] font-semibold text-blue-600">#{order.order_id}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                        <span className="text-[9px] uppercase tracking-widest text-gray-400">Date</span>
                        <span className="font-mono text-[11px] text-gray-800">{formattedDate}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                        <span className="text-[9px] uppercase tracking-widest text-gray-400">Time</span>
                        <span className="font-mono text-[11px] text-gray-800">{formattedTime}</span>
                    </div>
                </div>

                {/* CUSTOMER */}
                <div className="flex justify-between items-baseline pb-4 border-b border-dashed border-gray-300 mb-4">
                    <span className="text-sm font-semibold text-gray-900">{order.customer_name || 'Walk-in Customer'}</span>
                    <span className="font-mono text-[10px] font-bold text-emerald-600 tracking-wide uppercase">
                        {order.payment_method || 'Cash'}
                    </span>
                </div>

                {/* ITEMS HEADER */}
                <div className="grid grid-cols-[1fr_32px_64px] gap-1 py-2 border-t border-b border-gray-900 mb-1">
                    <span className="text-[8px] font-bold uppercase tracking-[1.5px] text-gray-500">Description</span>
                    <span className="text-[8px] font-bold uppercase tracking-[1.5px] text-gray-500 text-center">Qty</span>
                    <span className="text-[8px] font-bold uppercase tracking-[1.5px] text-gray-500 text-right">Amount</span>
                </div>

                {/* ITEMS */}
                <div className="mb-1">
                    {order.items?.map((item, index) => (
                        <div key={index} className="grid grid-cols-[1fr_32px_64px] gap-1 py-2 border-b border-dashed border-gray-200 last:border-none items-start">
                            <div>
                                <p className="text-[12px] font-semibold text-gray-900 leading-tight">{item.name}</p>
                                <p className="font-mono text-[10px] text-gray-400 mt-0.5">@ ৳{Number(item.price).toFixed(2)}</p>
                            </div>
                            <p className="font-mono text-[11px] text-gray-700 text-center pt-0.5">{item.quantity}</p>
                            <p className="font-mono text-[12px] font-semibold text-gray-900 text-right pt-0.5">
                                ৳{(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>

                {/* SUBTOTAL / DISCOUNT */}
                <div className="pt-3 border-t border-gray-200 space-y-1">
                    <div className="flex justify-between items-baseline">
                        <span className="text-[11px] text-gray-500">Subtotal</span>
                        <span className="font-mono text-[11px] text-gray-700">৳{Number(order.subtotal_amount).toFixed(2)}</span>
                    </div>
                    {order.total_discount_amount > 0 && (
                        <div className="flex justify-between items-baseline">
                            <span className="text-[11px] text-red-500">Discount</span>
                            <span className="font-mono text-[11px] text-red-500">− ৳{Number(order.total_discount_amount).toFixed(2)}</span>
                        </div>
                    )}
                </div>

                {/* NET TOTAL */}
                <hr className="border-t border-gray-900 my-3" />
                <div className="flex justify-between items-baseline">
                    <span className="text-[10px] font-bold uppercase tracking-[2px] text-gray-900">Net Total</span>
                    <span className="font-serif text-2xl font-bold text-gray-900">৳{Number(order.total_amount).toFixed(2)}</span>
                </div>

                {/* PAID / CHANGE */}
                <hr className="border-t border-dashed border-gray-300 my-3" />
                <div className="space-y-1">
                    <div className="flex justify-between items-baseline">
                        <span className="text-[9px] uppercase tracking-widest text-gray-400">Paid Amount</span>
                        <span className="font-mono text-[11px] text-gray-600">৳{Number(order.paid_amount || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                        <span className="text-[9px] uppercase tracking-widest text-gray-400">Change Due</span>
                        <span className="font-mono text-[12px] font-bold text-gray-900">৳{Number(order.change_amount || 0).toFixed(2)}</span>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="mt-8 pt-4 border-t border-dashed border-gray-300 text-center space-y-1">
                    <p className="font-serif text-sm text-gray-800">Thank you for your purchase</p>
                    <p className="text-[9px] text-gray-400">Goods once sold are not returnable · Keep receipt for reference</p>
                    <p className="font-mono text-[9px] text-gray-300 uppercase tracking-widest mt-2">
                        © {new Date().getFullYear()} Powered by Disibin
                    </p>
                </div>

            </div>
        </div>
    )
}

export default POSSLIPPAGE