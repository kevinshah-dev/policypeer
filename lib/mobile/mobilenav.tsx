import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
        <div className="absolute inset-0 bg-black/10" onClick={handleClose}/>
        <div className="relative bg-white p-4 w-80 max-w-full h-full">
          <div className="mb-4">
            <Link href="/" className="text-xl font-bold text-red-600">
              PolicyPeer
            </Link>
          </div>
            <div className="flex flex-col gap-2">
              <Link href="/companies" className="block" onClick={handleClose}>Companies</Link>
              <Link href="/quotes" className="block" onClick={handleClose}>Quotes</Link>
              <Link href="/privacy" className="block" onClick={handleClose}>Privacy Policy</Link>
              <Link href="/support" className="block" onClick={handleClose}>Support</Link>
          </div>
          <div className="mt-6 space-y-2">
            <Link href="/signup">
              <Button className="w-full" onClick={handleClose}>Sign In</Button>
            </Link>
          </div>
      </div>
      </div>
    )
  }