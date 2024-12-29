'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FaTiktok } from 'react-icons/fa'
import { FaXTwitter } from "react-icons/fa6";


interface MobileNavProps {
  setMobileMenuOpen: (open: boolean) => void
}

export default function MobileNav({ setMobileMenuOpen }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    setMobileMenuOpen(false)
  }

  return (
    <div className="fixed inset-0 bg-white z-50 md:hidden">
      <div className="absolute inset-0 bg-black/10" onClick={handleClose} />
      
      <div className="relative bg-white p-4 w-80 max-w-full h-full flex flex-col justify-between">
        <div>
          <div className="mb-4">
            <Link href="/" className="text-xl font-bold text-red-600">
              PolicyPeer
            </Link>
          </div>
          
          <div className="flex flex-col gap-2">
            <Link href="/companies" className="block" onClick={handleClose}>Companies</Link>
            <Link href="/quotes" className="block" onClick={handleClose}>Quotes</Link>
            <Link href="/privacy" className="block" onClick={handleClose}>Privacy</Link>
            <Link href="/support" className="block" onClick={handleClose}>Support</Link>
            <Link href="/dictionary" className="block" onClick={handleClose}>Dictionary</Link>
          </div>
        </div>
        
        <div>
          <div className="mt-6 space-y-2">
            <Link href="/signup">
              <Button className="w-full" onClick={handleClose}>Sign In</Button>
            </Link>
          </div>
          
          <div className="mt-6 flex justify-center space-x-4">
            <a
              href="https://x.com/policypeer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 transition-colors"
              aria-label="Follow us on X"
              title="Follow us on X"
            >
              <FaXTwitter size={24} />
            </a>
            
            <a
              href="https://www.tiktok.com/@policypeer6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-500 transition-colors"
              aria-label="Follow us on TikTok"
              title="Follow us on TikTok"
            >
              <FaTiktok size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
