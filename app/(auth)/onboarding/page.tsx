import AcountProfile from '@/app/components/forms/AcountProfile'
import React from 'react'
import { currentUser } from '@clerk/nextjs'
const page = async () => {

    // interface Props {
    //     id: string,
    //     objectId: string,
    //     userName: string,
    //     name: string,
    //     bio: string,
    //     image: string
    // }
    const user = await currentUser();
    const userInfo = {};
    const useData = {
        id: user?.id,
        objectId: userInfo?._id,
        userName: userInfo?.username || user?.username,
        name: userInfo?.name || user?.firstName || "",
        bio: userInfo?.bio || "",
        image: userInfo?.image || user?.imageUrl
    }
    return (
        <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
            <h1 className='text-white font-bold text-[30px]'>Onboaring</h1>
            <p className='mt-3 text-light-2 text-base-regular'>Complete your Profile now to use Threads</p>
            <section className='mt-9 bg-dark-2 p-10'>
                <AcountProfile user={useData} btnTitle="Continue" />
            </section>

        </main>
    )
}

export default page