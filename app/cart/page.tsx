/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { getCart } from '../actions';
import Link from 'next/link';
import { X } from 'lucide-react';
import RemoveCart from '@/components/RemoveCart';
import ChangeQuantity from '@/components/ChangeQuantity';
import CheckOutButton from '@/components/CheckOutButton';

interface CartProps {
    items: {
        product: {
            id: string;
            productName: string;
            subHeading: string;
            price: number;
            description: string;
            additionalInfo: string | null;
            imageUrl: string;
            createdAt: Date;
            updatedAt: Date;
        };
        quantity: number;
    }[];
}

const Cart = async () => {
    const cartItems = await getCart();

    if (!cartItems || !cartItems.items) {
        return <p>Cart is empty</p>;
    }

    return (
        <div className='px-10 py-10 '>
            <h2 className="text-2xl font-bold mb-4">Cart</h2>
            <div className='
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3

            gap-5'>
                {cartItems.items.map((item) => (
                    <div
                        key={item.product.id}
                        className="flex gap-4 items-center bg-neutral-100 w-full p-5 rounded-lg
                            relative
                        "
                    >
                        <RemoveCart
                            productId={item.product.id}
                        />
                        <img
                            src={item.product.imageUrl}
                            alt={item.product.productName}
                            width={100}
                            height={100}
                            className="rounded-lg object-cover w-24 h-24"
                        />
                        <div className='h-full'>
                            <p className="font-semibold">{item.product.productName}</p>
                            <p className="text-muted-foreground">${item.product.price}</p>

                            <ChangeQuantity
                                productId={item.product.id}
                                quantity={item.quantity}
                            />

                            <Link href={`/products/${item.product.id}`} className="text-blue-500 hover:underline">
                                View product
                            </Link>
                        </div>
                    </div>

                ))}
            </div>
            <CheckOutButton />
        </div >
    );
};

export default Cart;
