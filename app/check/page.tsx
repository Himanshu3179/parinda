"use client"
import React, { useEffect } from 'react'

const Page = () => {

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/user/check')
            const data = await res.json()
            console.log(data)
        }
        fetchData()
    }, [])

    return (
        <div>page</div>
    )
}

export default Page