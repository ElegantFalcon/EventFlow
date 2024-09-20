"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Moon, Sun, Plus, Trash, Edit, BarChart, X } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Mock data for events
const initialEvents = [
  { id: 1, name: "Tech Conference 2023", date: "2023-09-15", attendees: 500 },
  { id: 2, name: "Music Festival", date: "2023-07-22", attendees: 10000 },
  { id: 3, name: "Food & Wine Expo", date: "2023-08-05", attendees: 2000 },
  { id: 4, name: "Art Gallery Opening", date: "2023-10-01", attendees: 300 },
  { id: 5, name: "Startup Pitch Competition", date: "2023-11-12", attendees: 150 },
]

export default function AdminPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [events, setEvents] = useState(initialEvents)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({ name: "", date: "", attendees: "" })

  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault()
    const id = events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1
    const eventToAdd = {
      id,
      name: newEvent.name,
      date: newEvent.date,
      attendees: parseInt(newEvent.attendees, 10) || 0
    }
    setEvents([...events, eventToAdd])
    setNewEvent({ name: "", date: "", attendees: "" })
    setIsAddEventOpen(false)
  }

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
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">Admin</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={isDarkMode ? 'bg-gray-800' : 'bg-white'}>
              <DropdownMenuLabel>Admin Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </header>
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Admin Dashboard</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className={isDarkMode ? 'bg-gray-800' : 'bg-white'}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                <Calendar className={`h-4 w-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{events.length}</div>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>+2 from last month</p>
              </CardContent>
            </Card>
            <Card className={isDarkMode ? 'bg-gray-800' : 'bg-white'}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
                <BarChart className={`h-4 w-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{events.reduce((sum, event) => sum + event.attendees, 0)}</div>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>+20% from last month</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex justify-between items-center">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Manage Events</h2>
            <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
              <DialogTrigger asChild>
                <Button className={isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : ''}>
                  <Plus className="mr-2 h-4 w-4" /> Add New Event
                </Button>
              </DialogTrigger>
              <DialogContent className={`sm:max-w-[425px] ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'}`}>
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new event here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddEvent}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newEvent.name}
                        onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                        className={`col-span-3 ${isDarkMode ? 'bg-gray-700 text-gray-100' : ''}`}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        className={`col-span-3 ${isDarkMode ? 'bg-gray-700 text-gray-100' : ''}`}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="attendees" className="text-right">
                        Attendees
                      </Label>
                      <Input
                        id="attendees"
                        type="number"
                        value={newEvent.attendees}
                        onChange={(e) => setNewEvent({ ...newEvent, attendees: e.target.value })}
                        className={`col-span-3 ${isDarkMode ? 'bg-gray-700 text-gray-100' : ''}`}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save Event</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              className={`max-w-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300'}`}
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Table className={isDarkMode ? 'border-gray-700' : 'border-gray-200'}>
            <TableHeader>
              <TableRow className={isDarkMode ? 'border-gray-700' : 'border-gray-200'}>
                <TableHead className={isDarkMode ? 'text-gray-300' : ''}>Event Name</TableHead>
                <TableHead className={isDarkMode ? 'text-gray-300' : ''}>Date</TableHead>
                <TableHead className={isDarkMode ? 'text-gray-300' : ''}>Attendees</TableHead>
                <TableHead className={isDarkMode ? 'text-gray-300' : ''}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id} className={isDarkMode ? 'border-gray-700' : 'border-gray-200'}>
                  <TableCell className={`font-medium ${isDarkMode ? 'text-gray-300' : ''}`}>{event.name}</TableCell>
                  <TableCell className={isDarkMode ? 'text-gray-300' : ''}>{event.date}</TableCell>
                  <TableCell className={isDarkMode ? 'text-gray-300' : ''}>{event.attendees}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Edit className={`h-4 w-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash className={`h-4 w-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
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