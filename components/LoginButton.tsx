import Link from 'next/link'
import React from 'react'
import { buttonVariants } from '@/components/ui/button'
import { isAdmin, isAuthenticated } from '@/app/actions'
import LogoutButton from './LogoutButton';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from 'next-auth/react';


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
    const isadmin = await isAdmin();
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
                    <Link
                        href={'/profile'}
                    >
                        <DropdownMenuItem>
                            Profile
                        </DropdownMenuItem>
                    </Link>
                    {
                        isadmin && (
                            <Link
                                href={'/admin'}
                            >
                                <DropdownMenuItem>
                                    Admin
                                </DropdownMenuItem>
                            </Link>
                        )
                    }
                    <Link
                        href={'/signout'}
                    >
                        <DropdownMenuItem className='text-red-600'>
                            Sign Out
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>
        </div >
    )
}

