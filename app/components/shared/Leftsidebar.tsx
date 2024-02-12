"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from '@/constants/index'
import { SignOutButton, SignedIn } from '@clerk/nextjs'
import logout from "@/public/assets/logout.svg"
import { useRouter, usePathname } from 'next/navigation'
const Leftsidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className='custom-scrollbar leftsidebar'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
        {
          sidebarLinks.map((link: any) => {
            const isActive = (pathname.includes === (link.route) && link.route.length > 1) || pathname === link.route;
            return (
              <div>
                <Link
                  href={link.route}
                  key={link.label}
                  className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}
                >
                  <Image src={link.imgURL} alt={link.label} width={24} height={24} />
                  <p className='text-light-1 max-lg:hidden'>{link.label}</p>
                </Link>
              </div>

            )
          })
        }
      </div>
      <div className='mt-6 p-6'>
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('/sign-in')}>
            <div className='flex cursor-pointer gap-4 p-4'>
              <Image alt='logout' src={logout} width={24} height={24} />
              <p className='text-light-2 max-lg:hidden'>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>

      </div>

    </section >
  )
}

export default Leftsidebar