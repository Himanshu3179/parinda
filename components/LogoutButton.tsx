"use client"
import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'
import { useToast } from './ui/use-toast'

const LogoutButton = () => {
    const { toast } = useToast()

    const handleLogout = async () => {
        await signOut()
        toast({
            title: 'Success',
            description: 'You have successfully logged out',
        })
    }

    return (
        <Button
            onClick={handleLogout}
        >
            Sign Out
        </Button>
    )
}

export default LogoutButton