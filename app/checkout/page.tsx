/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { getCart } from '../actions';
import FinalCheckOutButton from '@/components/FinalCheckOutButton';

const Checkout = async () => {
    const cartItems = await getCart();
    if (!cartItems || !cartItems.items) {
        return <p>Your cart is empty</p>;
    }

    const totalPrice = cartItems.items.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0);

    return (
        <div className='md:px-10 
        py-10
            px-5
        pb-10'>
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <div className='grid grid-cols-1 gap-5'>
                {cartItems.items.map((item) => (
                    <div
                        key={item.product.id}
                        className="flex justify-between items-center bg-neutral-100 w-full p-5 rounded-lg"
                    >
                        <div className='flex items-center'>
                            <img
                                src={item.product.imageUrl}
                                alt={item.product.productName}
                                width={100}
                                height={100}
                                className="rounded-lg object-cover w-24 h-24 mr-4"
                            />
                            <div className='flex flex-col'>
                                <p className="font-semibold">{item.product.productName}</p>
                                <p className="text-muted-foreground">${item.product.price} x {item.quantity}</p>
                            </div>
                        </div>
                        <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
            </div>
            <div className="mt-8 flex justify-between items-center">
                <h3 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h3>
                <FinalCheckOutButton />
            </div>
        </div>
    );
};

export default Checkout;
