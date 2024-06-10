"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from './ui/use-toast';

type ProductProps = {
    product: {
        id: string;
        productName: string;
        price: number;
    };
};

const AddToCart = ({ product }: ProductProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleAddToCart = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product.id,
                    quantity: 1,
                }),
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }

            toast({
                title: "Success",
                description: "Product added to cart",
            });
            window.location.reload();
        } catch (error) {
            console.error('An unexpected error happened:', error);
            toast({
                title: "Error",
                description: "An unexpected error occurred",
                variant: 'destructive',
            });
        }
        setIsLoading(false);
    }


    return (
        <Button disabled={isLoading} onClick={handleAddToCart}>
            {isLoading ? 'Adding...' : 'Add to Cart'}
        </Button >

    );
};

export default AddToCart;