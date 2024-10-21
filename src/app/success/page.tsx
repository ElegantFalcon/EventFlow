"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Calendar, Moon, Sun, Check } from "lucide-react";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import { supabase } from "@/lib/supabaseClient";

export default function RegistrationSuccessful() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const searchParams = useSearchParams();
  const registrationId = searchParams.get("registrationId"); // Get the registration ID from the query string

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    // Confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        })
      );
    }, 250);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const downloadPdf = async () => {
      if (!registrationId) return;

      // Fetch registration and event details using Supabase
      const { data: registrationData, error: registrationError } = await supabase
        .from("registrations")
        .select("event_id, user_email")
        .eq("id", registrationId)
        .single();

      if (registrationError) {
        console.error("Error fetching registration details:", registrationError);
        return;
      }

      const { data: eventData, error: eventError } = await supabase
        .from("events")
        .select("name, location, date")
        .eq("id", registrationData.event_id)
        .single();

      if (eventError) {
        console.error("Error fetching event details:", eventError);
        return;
      }

      // Generate QR code based on registrationId
      const qrCodeUrl = await QRCode.toDataURL(registrationId);

      // Create a PDF with jsPDF
      const doc = new jsPDF();
      doc.setFontSize(22);
      doc.text("Event Registration Details", 20, 20);
      doc.setFontSize(16);
      doc.text(`Event: ${eventData.name}`, 20, 40);
      doc.text(`Location: ${eventData.location}`, 20, 50);
      doc.text(`Date: ${new Date(eventData.date).toLocaleDateString()}`, 20, 60);
      doc.text(`Registered Email: ${registrationData.user_email}`, 20, 70);

      // Add the QR code image to the PDF
      doc.addImage(qrCodeUrl, "JPEG", 20, 80, 50, 50);

      // Download the PDF after a short delay
      setTimeout(() => {
        doc.save("Event_Registration.pdf");
      }, 2000); // 2-second delay
    };

    downloadPdf();
  }, [registrationId]);

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-gray-100' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-900'}`}>
      <header className={`px-4 lg:px-6 h-14 flex items-center border-b ${isDarkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-white/50'} backdrop-blur-md`}>
        <Link className="flex items-center justify-center" href="/">
          <Calendar className={`h-6 w-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
          <span className={`ml-2 text-lg font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>EventFlow</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <Suspense fallback={<div>Loading...</div>}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-center p-8 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-md`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${isDarkMode ? 'bg-green-500' : 'bg-green-100'}`}
            >
              <Check className={`h-12 w-12 ${isDarkMode ? 'text-gray-900' : 'text-green-500'}`} />
            </motion.div>
            <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Registration Successful!
            </h1>
            <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Thank you for registering for the event. Your event details will be downloaded shortly.
            </p>
            <Button asChild className={`${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}>
              <Link href="/events">View All Events</Link>
            </Button>
          </motion.div>
        </Suspense>
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
  );
}
