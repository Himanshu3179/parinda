import Link from 'next/link'
import React from 'react'
import { buttonVariants } from '@/components/ui/button'
import { isAuthenticated } from '@/app/actions'
import LogoutButton from './LogoutButton';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export async function LoginButton() {
    const email = await isAuthenticated();
    console.log(email);
    if (!email) {
        return (
            <div>
                <Link
                    href="/signin"
                    className={`${buttonVariants({ variant: 'default' })}`}
                >
                    Sign In
                </Link>
            </div>
        )
    }
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="rounded-full w-12 h-12 bg-black text-white flex justify-center items-center">
                        {email.charAt(0).toUpperCase()}
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuLabel>{email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem className='text-red-600'>
                        Sign Out
                    </DropdownMenuItem>

                    
                
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

