"use client";
import Cookies from "js-cookie";
import { useState,useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Moon,
  Sun,
  Mail,
  Lock,
  User,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/navbar";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";


// WARNING: This implementation stores passwords in plain text, which is a severe security risk.
// This approach should NOT be used in a production environment.

export default function LoginSignupPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userType, setUserType] = useState<"user" | "admin">("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState<string | "">(""); 
  const router = useRouter();

 useEffect(() => {
    const storedUsername = sessionStorage.getItem("name") || Cookies.get("name");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  const toggleMode = () => setIsLogin(!isLogin);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // Login logic
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .single();

      if (error) {
        console.error("Login error:", error.message);
        // Handle login error (e.g., show error message to user)
      } else if (data) {
        // Login successful
        setSession(data.id, data.email,data.password, data.user_type,data.name);
        setUsername(data.name);
        console.log(data.name);
        if (data.user_type === "admin") {
          router.push("/admin");
        } else {
          router.push("/events");
        }
      } else {
        console.error("Invalid email or password");
        // Handle invalid credentials (e.g., show error message to user)
      }
    } else {
      //Signup logic
      const { data: existingUser } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single();
      if(existingUser){
        console.error("User already exists")
      }else{
        const { data, error } = await supabase
        .from("users")
        .insert([
          {
            email,
            password, // WARNING: Storing password in plain text
            name,
            user_type: userType,
          }
        ])
        .select();
        console.log(data)

      if (error) {
        console.error("Signup error:", error.message);
        // Handle signup error (e.g., show error message to user)
      } else if (data) {
        // Signup successful
        router.push("/login"); // Redirect to login page after successful signup
      }
      }
     
    }
  };
  const setSession = (userId: string, email: string, hashedPassword: string, userType: "user" | "admin",name:string) => {
    // Set session storage
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("hashedPassword", hashedPassword);
    sessionStorage.setItem("userType", userType);
    sessionStorage.setItem("name", name);
   
    Cookies.set("userId", userId, { expires: 1 }); // Set expiration for 1 day
    Cookies.set("email", email, { expires: 1 });
    Cookies.set("hashedPassword", hashedPassword, { expires: 1 });
    Cookies.set("userType", userType, { expires: 1 });
    console.log("Session successfully created for user:", name);
  };
  
  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-gray-100"
          : "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-900"
      }`}
    >
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} username={username}  />

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
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <RadioGroup
                defaultValue="user"
                className="flex justify-center space-x-4 mb-4"
                onValueChange={(value: "user" | "admin") => setUserType(value)}
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
            )}
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              {isLogin ? "Login" : "Sign Up"}
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