import AdminOrderHistory from '@/components/AdminOrders'
import React from 'react'
import { isAdmin } from '@/app/actions'
import { redirect } from 'next/navigation'

const page = async () => {
    if (!(await isAdmin())) {
        redirect('/')
    }
    return (
        <div className='py-10'>
            <AdminOrderHistory />
        </div>
    )
}

export default page