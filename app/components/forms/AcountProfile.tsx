"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"
import React, { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { UserValidation } from '@/lib/validations/user';
import Image from "next/image"
import { isBase64Image } from "@/lib/utils"
import { useUploadThing } from "@/lib/uploadingthings";
import { updateUser } from "@/lib/actions/user.actions"
import { usePathname, useRouter } from "next/navigation"
interface Props {
    user: {
        id: string,
        objectId: string,
        userName: string,
        name: string,
        bio: string,
        image: string
    };
    btnTitle: string

}
const AcountProfile = ({ user, btnTitle }: Props) => {
    const [files, setFiles] = useState<File[]>([]);
    const { startUpload } = useUploadThing("media");
    const router = useRouter();
    const pathname = usePathname();
    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: user?.image || "",
            name: user?.name || "",
            username: user?.userName || "",
            bio: user?.bio || "",
        }
    });
    const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
        e.preventDefault();
        const fileReader = new FileReader();
        if (e.target.files && e.target.files?.length > 0) {
            const file = e.target.files[0];
            setFiles(Array.from(e.target.files));
            if (!file.type.includes('image')) return;
            fileReader.onload = async (event) => {
                const imgDataurl = event.target?.result?.toString() || '';
                fieldChange(imgDataurl)
            }
            fileReader.readAsDataURL(file)

        }
    }
    const onSubmit = async (values: z.infer<typeof UserValidation>) => {
        const blob = values.profile_photo;
        const hasImageChanged = isBase64Image(blob);
        if (hasImageChanged) {
            const imgres = await startUpload(files)
            if (imgres && imgres[0].url) {
                values.profile_photo = imgres[0].url;
            }
        }
        // Here I am calling a backend function
        await updateUser(
            {
                userId: user.id,
                username: values.username,
                name: values.name,
                bio: values.bio,
                image: values.profile_photo,
                path: pathname
            }
        )
        if (pathname === '/profile/edit') {
            router.back();
        }
        else {
            router.push('/')
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10">
                <FormField
                    control={form.control}
                    name="profile_photo"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-4">
                            <FormLabel className="account-form_image-label">
                                {
                                    field.value ? (
                                        <Image alt="profile_photo" src={field.value} width={96} height={96} priority className="rounded-full object-contain" />
                                    ) : (
                                        <Image alt="profile_photo" src="/assets/profile.svg" width={24} height={24} className=" object-contain" />
                                    )
                                }
                            </FormLabel>
                            <FormControl className="flex-1 text-base-semibold text-gray-200">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    placeholder="Upload a photo"
                                    className="account-form_image-input"
                                    onChange={(e) => handleImage(e, field.onChange)}

                                />
                            </FormControl>
                            <FormMessage />

                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-4 w-full">
                            <FormLabel className="text-base-semibold text-light-2">
                                Name
                            </FormLabel>
                            <FormControl className="flex-1 text-base-semibold text-gray-200">
                                <Input
                                    type="text"
                                    className="account-form_input no-focus"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />

                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="flex gap-4 w-full flex-col">
                            <FormLabel className="text-base-semibold text-light-2">
                                Username
                            </FormLabel>
                            <FormControl className="flex-1 text-base-semibold text-gray-200">
                                <Input
                                    type="text"
                                    className="account-form_input no-focus"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem className="flex gap-4 w-full flex-col">
                            <FormLabel className="text-base-semibold text-light-2">
                                Bio
                            </FormLabel>
                            <FormControl className="flex-1 text-base-semibold text-gray-200">
                                <Textarea
                                    rows={10}
                                    className="account-form_input no-focus"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-primary-500">Submit</Button>
            </form>
        </Form>
    )
}

export default AcountProfile