"use client"
import React from 'react'
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import Image from 'next/image';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CommentValidation } from "@/lib/validations/threads";
import { Input } from '@/components/ui/input';
import { addCommentToThread } from '@/lib/actions/thread.action';
interface Props {
    threadId: string,
    currentUserimg: string,
    currentUserId: string
}
const Comment = ({
    threadId, currentUserimg, currentUserId
}: Props) => {
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm<z.infer<typeof CommentValidation>>({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: "",

        },
    });

    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        console.log("Working")
        await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname);
        form.reset();
    };
    return (
        <Form {...form}>
            <form
                className='comment-form'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name='thread'
                    render={({ field }) => (
                        <FormItem className='flex w-full items-center gap-3'>
                            <FormLabel>
                                <Image src={currentUserimg} alt="Profile image " width={48} height={48} className='rounded-full object-cover' />
                            </FormLabel>
                            <FormControl className='border-none bg-transparent'>
                                <Input className='no-focus text-light-1 outline-none' type='text' placeholder='Comment...' />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type='submit' className='comment-form_btn'>
                    Reply
                </Button>
            </form>
        </Form>
    )
}

export default Comment
