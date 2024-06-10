"use client"
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { Textarea } from './ui/textarea';
import SetLocationButton from './SetLocationButton';

interface User {
    name: string;
    email: string;
    contact: string;
    latitude: number;
    longitude: number;
    address: string;
}

const FormSchema = z
    .object({
        name: z.string().optional(),
        contact: z.string().optional(),
        address: z.string().optional(),
    });

const ProfileForm = () => {
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            contact: '',
            address: '',
        },
    });

    const [userData, setUserData] = useState<User | null>(null);

    const fetchUserDetails = async () => {
        const res = await fetch('/api/user');
        const data = await res.json();
        setUserData(data);
        console.log(data);
        form.reset({
            name: data.name,
            contact: data.contact,
            address: data.address,
        });
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        console.log("request sending");
        const response = await fetch('api/user/', {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            toast({
                title: "Success",
                description: "Profile updated successfully",
            })
            window.location.reload();
        } else {
            const data = await response.json()
            toast({
                title: "Error",
                description: data.message,
                variant: 'destructive'
            })
        }
    };

    return (
        <div className="p-5 max-w-lg border mx-auto w-full bg-neutral-50">
            <h1 className='text-2xl font-semibold mb-4 mx-auto w-fit'>Profile</h1>
            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                    <div className='space-y-2'>
                        <div className='bg-black text-white font-bold  p-5 rounded-full w-20 h-20
                            flex items-center justify-center 
                            mx-auto
                        '>
                            <div className='text-lg font-semibold'>{userData?.email.at(0)?.toUpperCase()}</div>
                        </div>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Your name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='contact'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Your contact' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder='Your email' value={userData?.email} readOnly />
                            </FormControl>
                        </FormItem>
                        <SetLocationButton />
                        <FormItem>
                            <FormLabel>Latitude</FormLabel>
                            <FormControl>
                                <Input placeholder='Your latitude' value={userData?.latitude} readOnly />
                            </FormControl>
                        </FormItem>
                        <FormItem>
                            <FormLabel>Longitude</FormLabel>
                            <FormControl>
                                <Input placeholder='Your longitude' value={userData?.longitude} readOnly />
                            </FormControl>
                        </FormItem>

                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Textarea placeholder='Your address' {...form.register('address')} />
                            </FormControl>
                        </FormItem>

                    </div>
                    <Button className='w-full mt-6' type='submit'
                        disabled={form.formState.isSubmitting}
                    >
                        Update
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ProfileForm;