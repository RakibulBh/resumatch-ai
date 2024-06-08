"use client"

import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center w-full px-8 py-4'>
      <h1 className='font-bold text-xl'>ResuMatch.ai</h1>
      <nav>
        <ul className='flex gap-3'>
            <Link href="/" className='text-semibold'>Home</Link>
            <Link href="#pricing" className='text-gray-400'>Pricing</Link>
            <Link href="/dashboard" className='text-gray-400'>Dashboard</Link>
            <Link href="#faq" className='text-gray-400'>FAQ</Link>
        </ul>
      </nav>
      <Button>Tailor my resume</Button>
    </div>
  )
}

export default Navbar
