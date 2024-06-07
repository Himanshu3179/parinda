import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='py-10 px-32'>
            <div className='flex   gap-10'>
                <div className='w-[60%] bg-neutral-50'>
                    <Image src="/image.png" alt="Next.js" width={500} height={400} />
                </div>
                <div className='flex flex-col gap-4 '>
                    <p className='text-2xl font-bold'>Product name</p>
                    <p className='text-muted-foreground'>Subheading</p>
                    <p className='font-semibold text-xl'>$10.99</p>
                    <p className='text-muted-foreground font-semibold '>Body text for describing why this product is simply a must-buy</p>
                    <Button>Add to Cart</Button>
                    <p className='text-muted-foreground font-semibold text-sm'>Text box for additional details or fine print</p>
                </div>
            </div>
            <div className='mt-10'>
                <p className='text-xl'>Related products</p>
                <div className='flex mt-5 justify-between'>
                    <div className='bg-neutral-50 p-5 rounded-lg flex flex-col gap-1'>
                        <Image src="/crow.png" alt="Next.js" width={300} height={400} />
                        <p className='font-semibold mt-2'>Product</p>
                        <p className='text-muted-foreground'>Body text for first product</p>
                        <p className='font-semibold'>$10.99</p>
                    </div>
                    <div className='bg-neutral-50 p-5 rounded-lg flex flex-col gap-1'>
                        <Image src="/crow.png" alt="Next.js" width={300} height={400} />
                        <p className='font-semibold mt-2'>Product</p>
                        <p className='text-muted-foreground'>Body text for first product</p>
                        <p className='font-semibold'>$10.99</p>
                    </div>
                    <div className='bg-neutral-50 p-5 rounded-lg flex flex-col gap-1'>
                        <Image src="/crow.png" alt="Next.js" width={300} height={400} />
                        <p className='font-semibold mt-2'>Product</p>
                        <p className='text-muted-foreground'>Body text for first product</p>
                        <p className='font-semibold'>$10.99</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page