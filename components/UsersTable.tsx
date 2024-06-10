import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
interface users {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    hashedPassword: string | null;
    resetToken: string | null;
    resetTokenExpires: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

const UsersTable = (
    { users }: { users: users[] }
) => {
    return (
        <div className="border w-full lg:w-1/2 md:w-2/3">
            <Table>
                <TableCaption>Users Table</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Created At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.createdAt.toDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default UsersTable   