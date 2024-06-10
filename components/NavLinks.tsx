"use client"

import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const NavLinks = () => {
    const Navlinks = [
        {
            title: 'Home',
            link: '/'
        },
        {
            title: 'About',
            link: '/about'
        },
        {
            title: 'Products',
            link: '/products'
        },
        {
            title: 'Orders',
            link: '/orders'
        },
        {
            title: 'Contact',
            link: '/contact'
        }
    ]
    const pathname = usePathname();
    const [totalItems, setTotalItems] = React.useState(0)

    useEffect(() => {
        const fetchTotalCartItems = async () => {
            const res = await fetch('/api/cart/total')
            const data = await res.json()
            setTotalItems(data.total)
        }
        fetchTotalCartItems()

    }, [])

    return (
        <>
            {Navlinks.map((link, index) => (
                <Link key={index} href={link.link}
                    className={`text-lg ${pathname === link.link ? 'font-semibold underline' : ''}`}
                >{link.title}</Link>
            ))}
            <Link href='/cart' className="flex ">
                <ShoppingCart size={24}
                    fill={pathname === '/cart' ? 'black' : 'none'}
                />
                <sup
                    className='bg-red-500 text-white rounded-full w-4 h-4 flex justify-center items-center'
                >
                    {totalItems}
                </sup>
            </Link>

        </>
    )
}

export default NavLinks