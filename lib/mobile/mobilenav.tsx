import { useState } from "react"
import Link from "next/link"

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false)
  
    return (
      <div className="block md:hidden">
        <button
          className="text-red-600 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          Menu
        </button>
        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-lg p-4 z-50">
            <Link href="/companies" className="block mb-2">Companies</Link>
            <Link href="/quotes" className="block mb-2">Quotes</Link>
            <Link href="/privacy" className="block mb-2">Privacy Policy</Link>
            <Link href="/support" className="block mb-2">Support</Link>
          </div>
        )}
      </div>
    )
  }