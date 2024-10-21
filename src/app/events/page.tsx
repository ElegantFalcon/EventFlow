"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Search, MapPin, Users, Building } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import { supabase } from "@/lib/supabaseClient"; // Adjust the path as necessary
import { useRouter } from "next/navigation";

import defaultImg from "../../assets/default.jpg"; // Go up two levels to reach the assets folder

interface Event {
  id: string;
  name: string;
  description?: string;
  location: string;
  date: string; // Assuming it's stored as a timestamp
  image: string;
  attendees?: number;
  width?: number;
  height?: number;
  organizer?: string;
}

export default function EventsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState<Event[]>([]); // State to hold fetched events
  const router = useRouter(); // Initialize router for navigation

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select("*");

      if (error) {
        console.error("Error fetching events:", error);
      } else {
        setEvents(data || []); // Set the fetched events to state
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRegister = async (eventId: string) => {
    const userEmail = sessionStorage.getItem("email");

    if (!userEmail) {
      console.error("User email not found in session storage.");
      return;
    }

    const { data: eventCurrent, error: eventFetchError } = await supabase
      .from("events")
      .select("attendees")
      .eq("id", eventId)
      .single();

    if (eventFetchError || eventCurrent.attendees <= 0) {
      console.error("Error fetching event data or no more attendees allowed.");
      return;
    }

    const { data: registrationData, error: registrationError } = await supabase
      .from("registrations")
      .insert([{ event_id: eventId, user_email: userEmail }])
      .select()
      .single();

    if (registrationError) {
      console.error("Error registering for event:", registrationError);
      return;
    }

    const updatedAttendeesCount = eventCurrent.attendees - 1;
    await supabase
      .from("events")
      .update({ attendees: updatedAttendeesCount })
      .eq("id", eventId);

    // Redirect to the success page, and pass the registration ID for later use
    localStorage.setItem("registrationId", registrationData.id);
    router.push("/success");
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-gray-100"
          : "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-900"
      }`}
    >
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1
              className={`text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Upcoming Events
            </h1>
            <p
              className={`mt-4 mx-auto max-w-[700px] text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Discover and join exciting events in your area.
            </p>
          </motion.div>
          <div className="mb-8 flex justify-center">
            <div className="relative w-full max-w-md">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  isDarkMode ? "text-gray-500" : "text-gray-400"
                }`}
              />
              <Input
                type="search"
                placeholder="Search events..."
                className={`pl-10 ${
                  isDarkMode
                    ? "bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
                    : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
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
                  isDarkMode ? "bg-gray-800/50" : "bg-white/50"
                } backdrop-blur-md`}
              >
                <div className="flex-shrink-0">
                  <Image
                    className="h-48 w-full object-cover"
                    src={
                      event.image && event.image.startsWith("http")
                        ? event.image
                        : defaultImg
                    }
                    // Ensure a valid image source
                    alt={event.name || "Event Image"} // Provide an alt text
                    width={event.width || 500}
                    height={event.height || 300}
                  />
                </div>

                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <h2
                      className={`text-xl font-semibold ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {event.name}
                    </h2>
                    <p
                      className={`mt-3 text-base ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <Calendar className="inline-block mr-2 h-5 w-5" />
                      {new Date(event.date).toLocaleDateString()}{" "}
                      {/* Format the date */}
                    </p>
                    <p
                      className={`mt-3 text-base ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <MapPin className="inline-block mr-2 h-5 w-5" />
                      {event.location}
                    </p>
                    <p
                      className={`mt-3 text-base ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <Users className="inline-block mr-2 h-5 w-5" />
                      {event.attendees || 0} attendees
                    </p>
                    {event.organizer && (
                      <p
                        className={`mt-3 text-base ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        <Building className="inline-block mr-2 h-5 w-5" />
                        {event.organizer}
                      </p>
                    )}
                  </div>
                  <div className="mt-6">
                    <Button
                      className={`w-full ${
                        isDarkMode
                          ? "bg-indigo-600 hover:bg-indigo-700"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white"
                      }`}
                      onClick={() => handleRegister(event.id)} // Pass event ID to registration handler
                    >
                      Register Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <footer
        className={`border-t py-4 px-4 lg:px-6 ${
          isDarkMode
            ? "bg-gray-900/50 border-gray-700"
            : "bg-white/50 border-gray-200"
        } backdrop-blur-md`}
      >
        <div className="container flex flex-col gap-4 sm:flex-row items-center justify-between">
          <p
            className={`text-xs ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            © 2023 EventFlow. All rights reserved.
          </p>
          <nav className="flex gap-4">
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
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
