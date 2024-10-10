"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Navbar from "@/components/navbar" // Import the Navbar component
import { Calendar, MapPin, Users, Clock, DollarSign, Info, ArrowLeft } from "lucide-react"

// Define the type for an event
interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  price: string;
  description: string;
  image: string;
}

// Mock event data (in a real app, you'd fetch this from an API)
const events: Event[] = [
  {
    id: "1",
    name: "Tech Conference 2023",
    date: "2023-09-15",
    time: "9:00 AM - 5:00 PM",
    location: "San Francisco Convention Center, CA",
    attendees: 500,
    price: "$299",
    description: "Join us for the biggest tech conference of the year! Featuring keynote speakers from leading tech companies, hands-on workshops, and networking opportunities.",
    image: `https://bnrrffmvjojnwlaxljmu.supabase.co/storage/v1/object/sign/event_img/images.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJldmVudF9pbWcvaW1hZ2VzLmpwZyIsImlhdCI6MTcyODU3ODExMywiZXhwIjoxNzMxMTcwMTEzfQ.FOZfdff3VJaqrml-Sc3DWtveRaQ2t2AmTJ0bUis093c&t=2024-10-10T16%3A35%3A13.789Z`
  },
  {
    id: "2",
    name: "Music Festival",
    date: "2023-07-22",
    time: "12:00 PM - 11:00 PM",
    location: "Central Park, New York, NY",
    attendees: 10000,
    price: "$150",
    description: "Experience a day filled with live performances from top artists across multiple genres. Food vendors, art installations, and more!",
    image: `/placeholder.svg?height=400&width=800`
  }
]

export default function EventDetailsPage() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const eventId = params?.id

  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  useEffect(() => {
    // Simulate API call to fetch event details
    const fetchEvent = () => {
      setLoading(true)
      setTimeout(() => {
        const foundEvent = events.find(e => e.id === eventId)
        if (foundEvent) {
          setEvent(foundEvent)
        } else {
          router.push('/404')
        }
        setLoading(false)
      }, 1000)
    }

    fetchEvent()
  }, [eventId, router])

  if (loading) {
    return (
      <div className={`flex flex-col min-h-screen ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-gray-100' 
          : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-900'
      }`}>
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main className="flex-1 py-12">
          <div className="container px-4 md:px-6">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-6">
                <Skeleton className="h-64 w-full" />
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-6 w-full" />
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-48 w-full" />
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!event) {
    return null
  }

  return (
    <div className={`flex flex-col min-h-screen ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-gray-100' 
        : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-900'
    }`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-6 lg:grid-cols-2"
          >
            <div className="space-y-6">
              <Button
                variant="ghost"
                className="mb-4"
                onClick={() => router.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Button>
              <h1 className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {event.name}
              </h1>
              <img 
                src={event.image} 
                alt={event.name} 
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <Card className={isDarkMode ? 'bg-gray-800' : 'bg-white'}>
                <CardContent className="p-6 space-y-2">
                  <p className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Calendar className="mr-2 h-5 w-5" />
                    {event.date}
                  </p>
                  <p className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Clock className="mr-2 h-5 w-5" />
                    {event.time}
                  </p>
                  <p className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <MapPin className="mr-2 h-5 w-5" />
                    {event.location}
                  </p>
                  <p className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Users className="mr-2 h-5 w-5" />
                    {event.attendees} attendees
                  </p>
                  <p className={`flex items-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <DollarSign className="mr-2 h-5 w-5" />
                    {event.price}
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card className={isDarkMode ? 'bg-gray-800' : 'bg-white'}>
                <CardHeader>
                  <CardTitle className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Event Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {event.description}
                  </p>
                </CardContent>
              </Card>
              <Button className={`w-full ${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}>
                Register for Event
              </Button>
              <Card className={isDarkMode ? 'bg-gray-800' : 'bg-white'}>
                <CardHeader>
                  <CardTitle className={`text-2xl font-semibold flex items-center ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    <Info className="mr-2 h-5 w-5" />
                    More Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Please contact us at events@example.com for more details about this event.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
