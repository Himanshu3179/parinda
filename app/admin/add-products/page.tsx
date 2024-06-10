import AddProductsForm from '@/components/AddProductsForm'
import React from 'react'
import { isAdmin } from '@/app/actions'
import { redirect } from 'next/navigation'

const page = async () => {
    if (!(await isAdmin())) {
        redirect('/')
    }
    return (
        <div className='py-10'>
            <AddProductsForm />
        </div>
    )
}

export default page