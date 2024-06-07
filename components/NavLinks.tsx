"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

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
    ]
    const pathname = usePathname();
    return (
        <>
            {Navlinks.map((link, index) => (
                <Link key={index} href={link.link}
                    className={`text-lg ${pathname === link.link ? 'font-semibold underline' : ''}`}
                >{link.title}</Link>
            ))}
        </>
    )
}

export default NavLinks