"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import Particles from "@/components/magicui/particles";

const ParticlesDemo = () => {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  return (
    <div>
      <Particles
        className="absolute inset-0"
        quantity={1000}
        ease={80}
        color={color}
        staticity={100}
        refresh
      />
    </div>
  );
};

export default ParticlesDemo;