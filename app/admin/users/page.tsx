import { getAllProducts, getAllUsers } from '@/app/actions'
import UsersTable from '@/components/UsersTable'
import React from 'react'
import { isAdmin } from '@/app/actions'
import { redirect } from 'next/navigation'

const page = async () => {
    if (!(await isAdmin())) {
        redirect('/')
    }
    const users = await getAllUsers()
    const allProducts = await getAllProducts()
    return (
        <div className='py-10'>
            <UsersTable
                users={users}
            />
        </div>
    )
}

export default page