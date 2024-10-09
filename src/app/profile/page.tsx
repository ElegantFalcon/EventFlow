"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserCircle, Edit2, Check } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function ProfilePage() {
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve user data from session storage
    const storedUsername = sessionStorage.getItem("name");
    const storedEmail = sessionStorage.getItem("email");

    if (!storedUsername || !storedEmail) {
      // If user data is not found, redirect to the login page
      router.push("/login");
    } else {
      setUsername(storedUsername);
      setEmail(storedEmail);
      setNewUsername(storedUsername); // Initialize newUsername with the current username
    }
  }, [router]);

  const handleSaveUsername =async () => {
    if (newUsername) {
      setUsername(newUsername);
      sessionStorage.setItem("name", newUsername); // Save updated username in session storage
      setIsEditing(false); // Exit edit mode
      const {data,error}=await supabase
        .from("users")
        .update({name:newUsername})
        .eq('email',email)
    }
  };

  if (!username || !email) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white py-10 px-5 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto bg-white text-black rounded-lg shadow-lg p-8 h-[500px] w-[600px] flex flex-col justify-between">
        {/* Profile Header */}
        <div className="flex items-center justify-center flex-col space-y-2">
          <UserCircle className="h-24 w-24 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">{username}'s Profile</h1>
          <p className="text-gray-500">Manage your account information</p>
        </div>

        {/* Profile Information */}
        <div className="space-y-4">
          {/* Username Field */}
          <div className="p-4 border rounded-lg shadow-sm bg-gray-50 relative">
            <strong className="block text-sm text-gray-700">Username</strong>
            {!isEditing ? (
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium text-gray-900">{username}</p>
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                  <Edit2 className="h-5 w-5 text-gray-500 hover:text-indigo-600" />
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newUsername || ""}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:border-indigo-600"
                />
                <Button variant="ghost" size="icon" onClick={handleSaveUsername}>
                  <Check className="h-5 w-5 text-green-600" />
                </Button>
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <strong className="block text-sm text-gray-700">Email</strong>
            <p className="text-lg font-medium text-gray-900">{email}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between space-x-4">
          <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg py-2 px-4">
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg py-2 px-4">
            <Link href="/logout">Logout</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
