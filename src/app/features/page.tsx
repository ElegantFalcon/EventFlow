"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Moon,
  Sun,
  Users,
  Zap,
  BarChart,
  Globe,
  Shield,
} from "lucide-react";
import Navbar from "@/components/navbar";

export default function FeaturesPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const features = [
    {
      icon: Calendar,
      title: "Easy Scheduling",
      description:
        "Create and manage events effortlessly with our intuitive scheduling tools.",
    },
    {
      icon: Users,
      title: "Attendee Management",
      description:
        "Keep track of your attendees, send invitations, and manage RSVPs all in one place.",
    },
    {
      icon: Zap,
      title: "Real-time Analytics",
      description:
        "Get instant insights into your event's performance with our powerful analytics tools.",
    },
    {
      icon: BarChart,
      title: "Customizable Reports",
      description:
        "Generate detailed reports tailored to your specific needs and preferences.",
    },
    {
      icon: Globe,
      title: "Multi-language Support",
      description:
        "Reach a global audience with our multi-language event pages and communications.",
    },
    {
      icon: Shield,
      title: "Advanced Security",
      description:
        "Protect your events and attendee data with our state-of-the-art security measures.",
    },
  ];

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
              Powerful Features for Seamless Event Management
            </h1>
            <p
              className={`mt-4 mx-auto max-w-[700px] text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Discover how EventFlow can revolutionize your event planning and
              management process.
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col items-center text-center p-6 rounded-lg shadow-lg ${
                  isDarkMode ? "bg-gray-800/50" : "bg-white/50"
                } backdrop-blur-md`}
              >
                <feature.icon
                  className={`h-12 w-12 mb-4 ${
                    isDarkMode ? "text-indigo-400" : "text-indigo-600"
                  }`}
                />
                <h2
                  className={`text-xl font-bold mb-2 ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {feature.title}
                </h2>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <Button
              className={`${
                isDarkMode
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              Get Started Now
            </Button>
          </motion.div>
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
