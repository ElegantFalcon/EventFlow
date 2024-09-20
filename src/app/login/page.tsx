"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Calendar,
  Moon,
  Sun,
  Mail,
  Lock,
  User,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/navbar";

export default function LoginSignupPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userType, setUserType] = useState("user");

  const toggleMode = () => setIsLogin(!isLogin);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-gray-100"
          : "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-900"
      }`}
    >
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`w-full max-w-md p-8 rounded-lg shadow-lg ${
            isDarkMode ? "bg-gray-800/50" : "bg-white/50"
          } backdrop-blur-md`}
        >
          <h1
            className={`text-2xl font-bold text-center mb-6 ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            {isLogin ? "Login to EventFlow" : "Sign Up for EventFlow"}
          </h1>
          <form className="space-y-4">
            <RadioGroup
              defaultValue="user"
              className="flex justify-center space-x-4 mb-4"
              onValueChange={(value) => setUserType(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="user" id="user" />
                <Label
                  htmlFor="user"
                  className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                >
                  User
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="admin" id="admin" />
                <Label
                  htmlFor="admin"
                  className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                >
                  Admin
                </Label>
              </div>
            </RadioGroup>
            {!isLogin && (
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                >
                  Name
                </Label>
                <div className="relative">
                  <User
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                      isDarkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className={`pl-10 ${
                      isDarkMode
                        ? "bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
                        : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className={isDarkMode ? "text-gray-300" : "text-gray-700"}
              >
                Email
              </Label>
              <div className="relative">
                <Mail
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`pl-10 ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
                      : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className={isDarkMode ? "text-gray-300" : "text-gray-700"}
              >
                Password
              </Label>
              <div className="relative">
                <Lock
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className={`pl-10 ${
                    isDarkMode
                      ? "bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400"
                      : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                />
              </div>
            </div>
            <Button
              type="submit"
              className={`w-full ${
                isDarkMode
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {isLogin ? `Login as ${userType}` : "Sign Up"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={toggleMode}
              className={`text-sm ${
                isDarkMode
                  ? "text-indigo-400 hover:text-indigo-300"
                  : "text-indigo-600 hover:text-indigo-500"
              }`}
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </button>
          </div>
        </motion.div>
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
