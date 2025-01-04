'use client'

import Link from "next/link"
import { FaTiktok } from 'react-icons/fa'
import { montserrat } from '@/lib/fonts/fonts'
import { FaXTwitter } from "react-icons/fa6"

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        {/* Branding */}
        <Link href="/" className="text-xl font-bold text-red-600 mb-4 md:mb-0">
          PolicyPeer
        </Link>
        
        {/* Social Media Links */}
        <div className="flex space-x-4">
          {/* X (Twitter) */}
          <a
            href="https://twitter.com/yourprofile" // Replace with your X/Twitter URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 transition-colors"
            aria-label="Follow us on X"
            title="Follow us on X"
          >
            <FaXTwitter size={24} />
          </a>
          
          {/* TikTok */}
          <a
            href="https://tiktok.com/@yourprofile" // Replace with your TikTok URL
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
    </footer>
  )
}
