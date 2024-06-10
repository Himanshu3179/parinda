import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <div className='flex lg:flex-row md:flex-col flex-col lg:px-32 md:px-20 px-5 py-10 lg:gap-40 gap-10'>
            <div className='lg:w-2/3  md:w-full text-justify flex flex-col gap-5 '>
                <p className='font-bold text-5xl'>About</p>
                <p className='text-muted-foreground'>Subheading for description or instructions</p>
                <p className='font-semibold'>Body text for your whole article or post. We’ll put in some lorem
                    ipsum to show how a filled-out page might look:</p>
                <p>Excepteur efficient emerging, minim veniam anim aute carefully
                    curated Ginza conversation exquisite perfect nostrud nisi
                    intricate Content. Qui international first-class nulla ut. Punctual
                    adipisicing, essential lovely queen tempor eiusmod irure.
                    Exclusive izakaya charming Scandinavian impeccable aute
                    quality of life soft power pariatur Melbourne occaecat discerning.
                    Qui wardrobe aliquip, et Porter destination Toto remarkable
                    officia Helsinki excepteur Basset hound. Zürich sleepy perfect
                    consectetur.</p>
            </div>
            <div
                className='
                
                flex justify-center items-center
                '
            >
                <Image src="/About.png" alt="Next.js" width={500} height={400} />
            </div>
        </div>
    )
}

export default page