import { Poppins } from "next/font/google"
import { Oswald } from "next/font/google"
import { Montserrat } from "next/font/google"

// Configure only the subsets and weights you need
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // adjust as needed
  variable: "--font-poppins",    // optional variable name
  display: "swap",               // recommended for better performance
})

export const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // adjust as needed
  variable: "--font-oswald",     // optional variable name
  display: "swap",               // recommended for better performance
})

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // adjust as needed
  variable: "--font-montserrat", // optional variable name
  display: "swap",               // recommended for better performance
})  
