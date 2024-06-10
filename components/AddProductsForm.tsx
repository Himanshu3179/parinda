"use client"
import React, { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
    productName: z.string().min(1, 'Product name is required'),
    subHeading: z.string().min(1, 'Subheading is required'),
    price: z.number().min(1, 'Price is required'),
    description: z.string().min(1, 'Description is required'),
    additionalInfo: z.string().optional(),
    imageUrl: z.string().min(1, 'Image URL is required'),
});

const AddProductsForm = () => {
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            productName: '',
            subHeading: '',
            price: 0,
            description: '',
            additionalInfo: '',
            imageUrl: '',
        },
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        values.price = Number(values.price);
        const response = await fetch('api/admin/products', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            toast({
                title: 'Success',
                description: 'Product added successfully',
            });
            // reset form
            form.reset();
            router.push('/admin');
        } else {
            toast({
                title: 'Error',
                description: 'An error occurred',
            });
        }
    };

    return (
        <div className="p-6 rounded-md w-full max-w-sm mx-auto border bg-neutral-50">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="productName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter product name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subHeading"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subheading</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter subheading" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter price"
                                            type="number"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                form.setValue('price', Number(e.target.value)); // Convert price to number
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="additionalInfo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Additional Info (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter additional info" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter image URL"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setImagePreview(e.target.value); // Set imagePreview to the imageUrl value
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {imagePreview && (
                            <div>
                                <img src={imagePreview} alt="Image Preview" className="w-full h-auto" />
                            </div>
                        )}
                    </div>
                    <Button className="w-full mt-6" type="submit" disabled={form.formState.isSubmitting}>
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default AddProductsForm;