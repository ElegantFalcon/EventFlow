"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Moon, Sun, Check } from "lucide-react";

export default function PricingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const plans = [
    {
      name: "Basic",
      price: "$19",
      features: [
        "Up to 5 events per month",
        "Basic analytics",
        "Email support",
      ],
    },
    {
      name: "Pro",
      price: "$49",
      features: [
        "Unlimited events",
        "Advanced analytics",
        "Priority email support",
        "Custom branding",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "All Pro features",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom integrations",
      ],
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
      <header
        className={`px-4 lg:px-6 h-14 flex items-center border-b ${
          isDarkMode
            ? "border-gray-700 bg-gray-900/50"
            : "border-gray-200 bg-white/50"
        } backdrop-blur-md`}
      >
        <Link className="flex items-center justify-center" href="/">
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
            Events
          </Link>
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
            <h1
              className={`text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Simple, Transparent Pricing
            </h1>
            <p
              className={`mt-4 mx-auto max-w-[700px] text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Choose the plan that&apos;s right for you and start managing your
              events with ease.
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col p-6 rounded-lg shadow-lg ${
                  isDarkMode ? "bg-gray-800/50" : "bg-white/50"
                } backdrop-blur-md`}
              >
                <h2
                  className={`text-2xl font-bold mb-4 ${
                    isDarkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </h2>
                <p
                  className={`text-4xl font-bold mb-6 ${
                    isDarkMode ? "text-indigo-400" : "text-indigo-600"
                  }`}
                >
                  {plan.price}
                </p>
                <ul className="mb-6 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center mb-2">
                      <Check
                        className={`mr-2 h-5 w-5 ${
                          isDarkMode ? "text-green-400" : "text-green-500"
                        }`}
                      />
                      <span
                        className={
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    isDarkMode
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  Get Started
                </Button>
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
