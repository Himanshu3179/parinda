"use client"
import React, { useEffect } from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
    const sideLinks = [
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
        <div className='lg:hidden '>
            <Sheet>
                <SheetTrigger>
                    <Menu />
                </SheetTrigger>
                <SheetContent side={"left"}>
                    <SheetClose asChild >
                        <Link
                            href={'/'}
                            className="font-bold text-xl">
                            Site Name
                        </Link>
                    </SheetClose>

                    <div className='flex flex-col gap-3 mt-10'>
                        {sideLinks.map((link, index) => {
                            const isActive = pathname === link.link;
                            return (
                                <SheetClose asChild key={index}>
                                    <Link href={link.link}
                                        className={`text-lg  py-2 rounded-lg px-3
                                        ${isActive ? 'bg-black text-white' : 'bg-neutral-100'}
                                        `}
                                    >{link.title}</Link>
                                </SheetClose>
                            )
                        })}
                        <SheetClose asChild >

                            <Link href='/cart' className={`flex
                            items-center
                            py-2
                            rounded-lg
                            px-3
                            ${pathname === '/cart' ? 'bg-black text-white' : 'bg-neutral-100'}
                            `}
                            >
                                <p className='pr-2'>
                                    Cart
                                </p>
                                <ShoppingCart size={24}
                                    fill={pathname === '/cart' ? 'black' : 'none'}
                                />
                                <sup
                                    className='bg-red-500 text-white rounded-full w-4 h-4 flex justify-center items-center'
                                >
                                    {totalItems}
                                </sup>
                            </Link>
                        </SheetClose>
                    </div>

                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Sidebar