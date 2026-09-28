import React from "react";
import { motion } from "framer-motion";

export default function PageTransition({ children }) {
  return (
    <motion.div
      // Distance thora kam kiya (40px) taake movement makkhan ki tarah ho
      initial={{ opacity: 0, y: 40 }}
      
      // Center lock
      animate={{ opacity: 1, y: 0 }}
      
      // Exit upward smoothly
      exit={{ opacity: 0, y: -40 }}
      
      // Timing aur Easing: Yeh curve shuru mein taiz aur end mein bhot naram (smooth) hota hai
      transition={{ 
        duration: 0.5, 
        ease: [0.25, 1, 0.5, 1] 
      }}
      
      // HARDWARE ACCELERATION: Yeh browser ko force karta hai ke animation GPU par chalaye bina lag ke
      style={{ willChange: "transform, opacity" }}
      
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}