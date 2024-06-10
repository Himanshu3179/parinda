"use client"
import { ChevronRight, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'

const CheckOutButton = () => {

    const [totalAmount, setTotalAmount] = React.useState(0)

    useEffect(() => {
        const fetchTotalCartItems = async () => {

            const res = await fetch('/api/cart/checkout')
            const data = await res.json()
            setTotalAmount(data.totalAmount)

        }
        fetchTotalCartItems()
    }, [])

    return (
        <div>
            <Link
                href='/checkout'
                className="bg-black text-white rounded-xl flex items-center 
                justify-center
                gap-3
                py-5 px-10
                absolute
                bottom-5
                right-5
                text-xl
            ">
                <ShoppingBag />Checkout:
                <span className='font-bold'>${totalAmount}</span>
                <ChevronRight />
            </Link>
        </div>
    )
}

export default CheckOutButton