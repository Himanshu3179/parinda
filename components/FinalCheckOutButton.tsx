"use client"
import React from 'react'
import { useToast } from './ui/use-toast'
import { useRouter } from 'next/navigation';

const FinalCheckOutButton = () => {
    const { toast } = useToast();
    const router = useRouter()
    const handleClick = async () => {
        try {
            const response = await fetch('/api/cart/checkout', {
                method: 'POST',
            });

            if (response.ok) {
                toast({
                    title: 'Success',
                    description: 'Checkout successful',
                })
                router.push('/orders');
            } else {
                const data = await response.json();
                toast({
                    title: 'Error',
                    description: data.message,
                    variant: 'destructive',
                })
            }

        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'An unexpected error occurred',
                variant: 'destructive',
            })
        }
    }

    return (
        <button className="bg-black text-white py-2 px-4 rounded-lg"
            onClick={handleClick}
        >
            Checkout
        </button>
    )
}

export default FinalCheckOutButton