"use client"
import React, { useEffect } from 'react'

const ChangeQuantity = (
    { productId, quantity }: { productId: string, quantity: number }
) => {

    const [totalItems, setTotalItems] = React.useState(quantity)

    const [loading, setLoading] = React.useState(false)

    const handleIncrement = async () => {
        setLoading(true)
        setTotalItems(totalItems + 1)
        try {
            const res = await fetch('/api/cart/increment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId,
                }),
            })

            if (!res.ok) {
                window.location.reload()
                throw new Error('Request failed')
            }
        } catch (error) {
            console.error(error)
            setTotalItems(totalItems)
        }
        setLoading(false)
    }

    const handleDecrement = async () => {
        setLoading(true)
        setTotalItems(totalItems - 1)
        try {
            const res = await fetch('/api/cart/decrement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId,
                }),
            })
            if (!res.ok) {
                throw new Error('Request failed')
            }
            if (totalItems === 1) {
                window.location.reload()
            }
        } catch (error) {
            console.error(error)
            // Revert the optimistic update
            setTotalItems(totalItems)
        }
        setLoading(false)
    }

    return (
        <div className='flex'>
            <button className={`bg-gray-200 w-6 h-6 flex items-center justify-center
                ${totalItems === 1 ? 'cursor-not-allowed ' : ''}
            `}
                onClick={handleDecrement}
                disabled={loading || totalItems === 1} // Disable the button if totalItems is 1
            >
                -
            </button>

            <span className='mx-2'>
                {totalItems}
            </span>

            <button className='bg-gray-200 w-6 h-6 flex items-center justify-center'
                onClick={handleIncrement}
                disabled={loading}
            >
                +
            </button>
        </div>
    )
}

export default ChangeQuantity