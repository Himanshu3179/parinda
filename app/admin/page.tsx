import React from 'react'
import { isAdmin } from '@/app/actions'
import { redirect } from 'next/navigation'

import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

const page = async () => {
    if (!(await isAdmin())) {
        redirect('/')
    }
    return (
        <div className='py-10  w-full flex flex-col items-center '>
            <p className='text-3xl font-bold '>Admin Page</p>
            <div className='flex justify-center pt-10'>
                <Link href='/admin/add-products'
                    className={`${buttonVariants({ variant: 'default' })}`}
                >Add Products</Link>
                <Link href='/admin/orders'
                    className={`${buttonVariants({ variant: 'default' })
                        } ml-4`}
                >Orders</Link>

                <Link href='/admin/users'
                    className={`${buttonVariants({ variant: 'default' })
                        } ml-4`}
                >Users</Link>
            </div>
        </div>
    )
}

export default page
