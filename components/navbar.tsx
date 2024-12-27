"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import MobileNav from "@/lib/mobile/mobilenav";
import { poppins } from "@/lib/fonts/fonts";

// Define a type for your navigation links
interface NavLink {
  label: string;
  href: string;
}

interface NavBarProps {
  logoHref?: string;
  logoText: string;
  navLinks: NavLink[];
  signInHref: string;
}

export function NavBar({
  logoHref = "/",
  logoText,
  navLinks,
  signInHref,
}: NavBarProps) {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href={logoHref} className={`
            text-2xl font-bold text-red-600
            ${poppins.className}  
          `}
        >
          {logoText}
        </Link>

        {/* Navigation Links (using Shadcn NavigationMenu) */}
        <nav className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
                {navLinks.map((link) => (
                    <NavigationMenuItem key={link.label}>
                        <Link href={link.href} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                {link.label}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <div className="flex items-center gap-4">
          <MobileNav /> {/* Mobile Nav component, assuming it exists */}
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
          <Link href={signInHref}>
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
