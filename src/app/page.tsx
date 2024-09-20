"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Users,
  Zap,
  ChevronRight,
  Menu,
  Moon,
  Sun,
  Star,
  ArrowRight,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function EnhancedLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-gray-100"
          : "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-900"
      }`}
    >
      <header
        className={`px-4 lg:px-6 h-14 flex items-center border-b ${
          isDarkMode
            ? "border-gray-700 bg-gray-900/50"
            : "border-gray-200 bg-white/50"
        } backdrop-blur-md`}
      >
        <Link className="flex items-center justify-center" href="#">
          <Calendar
            className={`h-6 w-6 ${
              isDarkMode ? "text-indigo-400" : "text-indigo-600"
            }`}
          />
          <span
            className={`ml-2 text-lg font-bold ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            EventFlow
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex gap-6">
            <Link
              className={`text-sm font-medium ${
                isDarkMode
                  ? "text-gray-300 hover:text-indigo-400"
                  : "text-gray-900 hover:text-indigo-600"
              } transition-colors`}
              href="#"
            >
              Features
            </Link>
            <Link
              className={`text-sm font-medium ${
                isDarkMode
                  ? "text-gray-300 hover:text-indigo-400"
                  : "text-gray-900 hover:text-indigo-600"
              } transition-colors`}
              href="#"
            >
              Pricing
            </Link>
            <Link
              className={`text-sm font-medium ${
                isDarkMode
                  ? "text-gray-300 hover:text-indigo-400"
                  : "text-gray-900 hover:text-indigo-600"
              } transition-colors`}
              href="#"
            >
              Events
            </Link>
          </div>
          <Button
            asChild
            className={
              isDarkMode
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }
          >
            <Link href="#">Login / Sign Up</Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className={isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white"}
            >
              <nav className="flex flex-col gap-4">
                <Link
                  className={`text-sm font-medium ${
                    isDarkMode
                      ? "hover:text-indigo-400"
                      : "hover:text-indigo-600"
                  } transition-colors`}
                  href="#"
                >
                  Features
                </Link>
                <Link
                  className={`text-sm font-medium ${
                    isDarkMode
                      ? "hover:text-indigo-400"
                      : "hover:text-indigo-600"
                  } transition-colors`}
                  href="#"
                >
                  Pricing
                </Link>
                <Link
                  className={`text-sm font-medium ${
                    isDarkMode
                      ? "hover:text-indigo-400"
                      : "hover:text-indigo-600"
                  } transition-colors`}
                  href="#"
                >
                  Events
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h1
                  className={`text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Welcome to{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                    EventFlow
                  </span>
                </h1>
                <p
                  className={`mx-auto max-w-[700px] text-lg sm:text-xl md:text-2xl ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Streamline your event management process with our powerful and
                  intuitive platform.
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 mt-6"
              >
                <Button
                  size="lg"
                  className={`text-lg ${
                    isDarkMode
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={`text-lg ${
                    isDarkMode
                      ? "border-gray-700 hover:bg-gray-800"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  Learn More
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center justify-center mt-8 space-x-4"
              >
                <Star
                  className={`h-6 w-6 ${
                    isDarkMode ? "text-yellow-500" : "text-yellow-500"
                  }`}
                />
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Trusted by over 10,000 event organizers worldwide
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section
          className={`w-full py-12 md:py-24 lg:py-32 ${
            isDarkMode ? "bg-gray-800/50" : "bg-white/50"
          } backdrop-blur-md`}
        >
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`flex flex-col items-center space-y-4 text-center ${
                  isDarkMode ? "bg-gray-700/50" : "bg-gray-100/50"
                } p-6 rounded-lg backdrop-blur-md`}
              >
                <Calendar
                  className={`h-12 w-12 ${
                    isDarkMode ? "text-indigo-400" : "text-indigo-600"
                  }`}
                />
                <h2
                  className={`text-xl font-bold ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Easy Scheduling
                </h2>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Create and manage events effortlessly with our intuitive
                  scheduling tools.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`flex flex-col items-center space-y-4 text-center ${
                  isDarkMode ? "bg-gray-700/50" : "bg-gray-100/50"
                } p-6 rounded-lg backdrop-blur-md`}
              >
                <Users
                  className={`h-12 w-12 ${
                    isDarkMode ? "text-indigo-400" : "text-indigo-600"
                  }`}
                />
                <h2
                  className={`text-xl font-bold ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Attendee Management
                </h2>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Keep track of your attendees, send invitations, and manage
                  RSVPs all in one place.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`flex flex-col items-center space-y-4 text-center ${
                  isDarkMode ? "bg-gray-700/50" : "bg-gray-100/50"
                } p-6 rounded-lg backdrop-blur-md`}
              >
                <Zap
                  className={`h-12 w-12 ${
                    isDarkMode ? "text-indigo-400" : "text-indigo-600"
                  }`}
                />
                <h2
                  className={`text-xl font-bold ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Real-time Analytics
                </h2>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Get instant insights into your event&apos;s performance with
                  our powerful analytics tools.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 ${
                isDarkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              What Our Users Say
            </motion.h2>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  name: "Sarah Johnson",
                  text: "EventFlow has revolutionized how we manage our corporate events. It's a game-changer!",
                },
                {
                  name: "Michael Chen",
                  text: "The ease of use and powerful features make EventFlow my go-to platform for all my events.",
                },
                {
                  name: "Emily Rodriguez",
                  text: "I love how EventFlow simplifies every aspect of event planning. It's a must-have tool!",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                  className={`flex flex-col items-center space-y-4 text-center p-6 rounded-lg ${
                    isDarkMode ? "bg-gray-800/50" : "bg-gray-100/50"
                  } backdrop-blur-md`}
                >
                  <img
                    alt={`${testimonial.name} avatar`}
                    className="rounded-full"
                    height="100"
                    src="/placeholder.svg?height=100&width=100"
                    style={{
                      aspectRatio: "100/100",
                      objectFit: "cover",
                    }}
                    width="100"
                  />
                  <div className="space-y-2">
                    <h3
                      className={`text-xl font-bold ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {testimonial.name}
                    </h3>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      "{testimonial.text}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        <section
          className={`w-full py-12 md:py-24 lg:py-32 ${
            isDarkMode ? "bg-gray-800/50" : "bg-gray-100/50"
          } backdrop-blur-md`}
        >
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h2
                  className={`text-3xl font-bold tracking-tighter sm:text-5xl ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  Ready to streamline your events?
                </h2>
                <p
                  className={`mx-auto max-w-[600px] ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  } md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed`}
                >
                  Join thousands of satisfied users and take your event
                  management to the next level with EventFlow.
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full max-w-sm space-y-2"
              >
                <form className="flex space-x-2">
                  <Input
                    className={`max-w-lg flex-1 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-gray-100"
                        : "bg-white border-gray-300"
                    }`}
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button
                    type="submit"
                    className={
                      isDarkMode
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }
                  >
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                <p
                  className={`text-xs ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Start your free trial. No credit card required.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <footer
        className={`border-t py-6 md:py-0 ${
          isDarkMode
            ? "bg-gray-900/50 border-gray-700"
            : "bg-white/50 border-gray-200"
        } backdrop-blur-md`}
      >
        <div className="container flex flex-col gap-4 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
          <p
            className={`text-xs ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            © 2023 EventFlow. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className={`text-xs hover:underline underline-offset-4 ${
                isDarkMode
                  ? "text-gray-400 hover:text-gray-100"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className={`text-xs hover:underline underline-offset-4 ${
                isDarkMode
                  ? "text-gray-400 hover:text-gray-100"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
