"use client"

import { useState,useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar, Moon, Sun } from "lucide-react"

interface NavbarProps {
  isDarkMode: boolean
  toggleTheme: () => void
  username?: string;
}

export default function Navbar({ isDarkMode, toggleTheme}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [username, setUsername] = useState<string | null>(null);
  const pathname = usePathname()

  const navItems = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Events", href: "/events" },
  ]
  useEffect(() => {
    // Check session storage for username on component mount
    const storedUsername = sessionStorage.getItem("username");
    setUsername(storedUsername);
  }, []);
  return (
    <header className={`px-4 lg:px-6 h-14 flex items-center border-b ${
      isDarkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-white/50'
    } backdrop-blur-md`}>
      <Link className="flex items-center justify-center" href="/">
        <Calendar className={`h-6 w-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
        <span className={`ml-2 text-lg font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>EventFlow</span>
      </Link>
      <nav className="ml-auto items-center gap-4 sm:gap-6 hidden md:flex">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`text-sm font-medium ${
              pathname === item.href
                ? isDarkMode
                  ? 'text-indigo-400'
                  : 'text-indigo-600'
                : isDarkMode
                ? 'text-gray-300 hover:text-indigo-400'
                : 'text-gray-900 hover:text-indigo-600'
            } transition-colors`}
          >
            {item.name}
          </Link>
        ))}
        <Button asChild className={isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}>
          <Link href="/login">Login / Sign Up</Link>
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </nav>
      <div className="md:hidden ml-auto flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg
            className={`h-6 w-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </Button>
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className={`absolute top-14 left-0 right-0 ${
            isDarkMode ? 'bg-gray-900' : 'bg-white'
          } border-b ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          } p-4 md:hidden`}
        >
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium ${
                  pathname === item.href
                    ? isDarkMode
                      ? 'text-indigo-400'
                      : 'text-indigo-600'
                    : isDarkMode
                    ? 'text-gray-300 hover:text-indigo-400'
                    : 'text-gray-900 hover:text-indigo-600'
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
           {username ? (
              <Button asChild className={`bg-indigo-600 hover:bg-indigo-700 ${!isDarkMode ? 'text-white' : ''}`}>
                <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                  {username}
                </Link>
              </Button>
            ) : (
              <Button asChild className={`bg-indigo-600 hover:bg-indigo-700 ${!isDarkMode ? 'text-white' : ''}`}>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  Login / Sign Up
                </Link>
              </Button>
            )}

          </nav>
        </motion.div>
      )}
    </header>
  )
}