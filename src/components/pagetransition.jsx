import React from "react";
import { motion } from "framer-motion";

export default function PageTransition({ children }) {
  return (
    <motion.div
      // Starts far left with a cinematic motion blur and slightly zoomed out
      initial={{ opacity: 0, x: "-15vw", scale: 0.98, filter: "blur(8px)" }}
      
      // Snaps perfectly into the center, sharp and clear
      animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
      
      // Swipes far right, blurring out as it leaves
      exit={{ opacity: 0, x: "15vw", scale: 0.98, filter: "blur(8px)" }}
      
      // Slightly longer duration so the user ACTUALLY sees it happen
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}