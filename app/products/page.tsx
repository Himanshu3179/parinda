import React from 'react'
import { getAllProducts } from '@/app/actions'
import Link from 'next/link'
const page = async () => {
    const allProducts = await getAllProducts()
    return (
        <div className='
        py-10 
        xl:px-32
        lg:px-20
        md:px-20
        px-10
        
        '>
            <p className='text-3xl font-bold'>All Products</p>
            <div className='mt-10'>
                <div className='
                    grid grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-3
                mt-5 
                gap-5
                '>
                    {allProducts.map((product) => (
                        <Link key={product.id}
                            href={`/products/${product.id}`}
                            className='bg-neutral-50 p-5 rounded-lg flex flex-col gap-1
                            cursor-pointer  
                        '>
                            <img src={product.imageUrl} alt={product.productName} width={300} height={400}
                                className='object-cover w-full h-48 rounded-lg'
                            />
                            <p className='font-semibold mt-2'>{product.productName}</p>
                            <p className='text-muted-foreground'>{product.description}</p>
                            <p className='font-semibold'>${product.price}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default page
