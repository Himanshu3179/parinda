import AddProductsForm from '@/components/AddProductsForm'
import React from 'react'
import { isAdmin } from '@/app/actions'
import { redirect } from 'next/navigation'

const page = async () => {
    if (!(await isAdmin())) {
        redirect('/')
    }
    return (
        <div className='py-10 w-full'>
            <p className='text-3xl font-bold mx-auto w-fit mb-10'>Add Products</p>
            <AddProductsForm />
        </div>
    )
}

export default page