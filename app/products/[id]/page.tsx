import React from 'react'
import { getAllProducts } from '@/app/actions'
import Link from 'next/link'
import AddToCart from '@/components/AddToCart'
import { redirect } from 'next/navigation'

const page = async (
    { params }: { params: { id: string } }
) => {
    const allProducts = await getAllProducts()

    const mainProduct = allProducts.find((product) => product.id === params.id)
    const relatedProducts = allProducts.filter((product) => product.id !== params.id)

    if (!mainProduct) {
        redirect('/')
    }


    return (
        <div className='
        py-10 
        xl:px-32
        lg:px-20
        md:px-20
        px-10
        '>
            <div className='flex 
            flex-col
            md:flex-row
            md:gap-10
            gap-1
            
            '>
                <div className='
                lg:w-[60%]
                w-full
                h-fit
                '>
                    <img src={mainProduct.imageUrl} alt={mainProduct.productName} width={500} height={400}
                        className='object-cover w-full h-full rounded-lg'
                    />

                </div>
                <div className='flex flex-col gap-4 bg-neutral-100 
                lg:max-w-[40%] 
                w-full 
                p-5 h-fit rounded-xl'>
                    <p className='text-2xl font-bold'>{mainProduct?.productName}</p>
                    <p className='text-muted-foreground'>{mainProduct?.subHeading}</p>
                    <p className='font-semibold text-xl'>${mainProduct?.price}</p>
                    <p className='text-muted-foreground font-semibold '>{mainProduct?.description}</p>
                    <AddToCart
                        product={mainProduct}
                    />
                    <p className='text-muted-foreground font-semibold text-sm'>{mainProduct?.additionalInfo}</p>
                </div>
            </div>
            <div className='mt-10'>
                <p className='text-xl'>Related products</p>
                <div className='
                    grid grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-3
                mt-5 
                gap-5
                '>
                    {relatedProducts.map((product) => (
                        <Link
                            href={`/products/${product.id}`}
                            key={product.id} className='bg-neutral-50 p-5 rounded-lg flex flex-col gap-1
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
