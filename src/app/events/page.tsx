"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Moon, Sun, Search, MapPin, Users } from "lucide-react"
import Image from "next/image"

export default function EventsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  const events = [
    { id: 1, name: "Tech Conference 2023", date: "2023-09-15", location: "San Francisco, CA", attendees: 500, image: "/placeholder.svg?height=400&width=600" },
    { id: 2, name: "Music Festival", date: "2023-07-22", location: "New York, NY", attendees: 10000, image: "/placeholder.svg?height=400&width=600" },
    { id: 3, name: "Food & Wine Expo", date: "2023-08-05", location: "Chicago, IL", attendees: 2000, image: "/placeholder.svg?height=400&width=600" },
    { id: 4, name: "Art Gallery Opening", date: "2023-10-01", location: "Los Angeles, CA", attendees: 300, image: "/placeholder.svg?height=400&width=600" },
    { id: 5, name: "Startup Pitch Competition", date: "2023-11-12", location: "Boston, MA", attendees: 150, image: "/placeholder.svg?height=400&width=600" },
    { id: 6, name: "Wellness Retreat", date: "2023-09-30", location: "Sedona, AZ", attendees: 50, image: "/placeholder.svg?height=400&width=600" },
  ]

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={`flex flex-col min-h-screen ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-gray-100' 
        : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-900'
    }`}>
      <header className={`px-4 lg:px-6 h-14 flex items-center border-b ${
        isDarkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-white/50'
      } backdrop-blur-md`}>
        <Link className="flex items-center justify-center" href="/">
          <Calendar className={`h-6 w-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
          <span className={`ml-2 text-lg font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>EventFlow</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-900 hover:text-indigo-600'} transition-colors`} href="#">
            Features
          </Link>
          <Link className={`text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-900 hover:text-indigo-600'} transition-colors`} href="#">
            Pricing
          </Link>
          <Button asChild className={isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}>
            <Link href="#">Login / Sign Up</Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </nav>
      </header>
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className={`text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Upcoming Events
            </h1>
            <p className={`mt-4 mx-auto max-w-[700px] text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Discover and join exciting events in your area.
            </p>
          </motion.div>
          <div className="mb-8 flex justify-center">
            <div className="relative w-full max-w-md">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <Input
                type="search"
                placeholder="Search events..."
                className={`pl-10 ${isDarkMode ? 'bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400' : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col rounded-lg shadow-lg overflow-hidden ${
                  isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'
                } backdrop-blur-md`}
              >
                <div className="flex-shrink-0">
                  <Image className="h-48 w-full object-cover" src={event.image} alt={event.name} />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{event.name}</h2>
                    <p className={`mt-3 text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <Calendar className="inline-block mr-2 h-5 w-5" />
                      {event.date}
                    </p>
                    <p className={`mt-3 text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <MapPin className="inline-block mr-2 h-5 w-5" />
                      {event.location}
                    </p>
                    <p className={`mt-3 text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <Users className="inline-block mr-2 h-5 w-5" />
                      {event.attendees} attendees
                    </p>
                  </div>
                  <div className="mt-6">
                    <Button className={`w-full ${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}>
                      Register Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <footer className={`border-t py-4 px-4 lg:px-6 ${isDarkMode ? 'bg-gray-900/50 border-gray-700' : 'bg-white/50 border-gray-200'} backdrop-blur-md`}>
        <div className="container flex flex-col gap-4 sm:flex-row items-center justify-between">
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>© 2023 EventFlow. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link className={`text-xs hover:underline underline-offset-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-100' : 'text-gray-600 hover:text-gray-900'}`} href="#">
              Terms of Service
            </Link>
            <Link className={`text-xs hover:underline underline-offset-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-100' : 'text-gray-600 hover:text-gray-900'}`} href="#">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}