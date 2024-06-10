"use client"
import { X } from 'lucide-react'
import React from 'react'

const RemoveCart = (
  { productId }: { productId: string }
) => {

  const handleRemoveFromCart = async () => {
    const res = await fetch('/api/cart/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
      }),
    })
    const data = await res.json()

    if (!res.ok) {
      console.error(data.error)
      return
    }
    window.location.reload()
  }

  return (
    <button className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
      onClick={handleRemoveFromCart}
    >
      <X size={16} />
    </button>
  )
}

export default RemoveCart