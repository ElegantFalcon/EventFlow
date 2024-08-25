"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Calendar, Users, Zap, ChevronRight, Menu } from "lucide-react"
import { MarqueeDemo } from "@/components/MarqueeDemo"

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <div className="flex flex-col min-h-[100dvh]">
     <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Calendar className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">EventFlow</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex gap-6">
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Features
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Pricing
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              View Events
            </Link>
          </div>
          <Button asChild>
            <Link href="#">Login / Sign Up</Link>
          </Button>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                  Features
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                  Pricing
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                  View Events
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to EventFlow
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Streamline your event management process with our powerful and intuitive platform. Create, manage, and
                  promote events with ease.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <Calendar className="h-12 w-12" />
                <h2 className="text-xl font-bold">Easy Scheduling</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Create and manage events effortlessly with our intuitive scheduling tools.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Users className="h-12 w-12" />
                <h2 className="text-xl font-bold">Attendee Management</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Keep track of your attendees, send invitations, and manage RSVPs all in one place.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Zap className="h-12 w-12" />
                <h2 className="text-xl font-bold">Real-time Analytics</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Get instant insights into your event&apos;s performance with our powerful analytics tools.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Users Say</h2>
           <MarqueeDemo/>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to streamline your events?</h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of satisfied users and take your event management to the next level with EventFlow.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit">
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Start your free trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 EventFlow. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}