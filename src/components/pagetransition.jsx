import React from "react";
import { motion } from "framer-motion";

export default function PageTransition({ children }) {
  return (
    <motion.div
      // Naya page neechay (bottom) se aayega, thora blur hoga
      initial={{ opacity: 0, y: 100, filter: "blur(8px)" }}
      
      // Screen ke bilkul center mein aakar clear aur lock ho jayega
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      
      // Purana page upar (top) ki taraf slide out ho jayega
      exit={{ opacity: 0, y: -100, filter: "blur(8px)" }}
      
      // Timing 0.6s rakhi hai taake user ko maza aaye aur proper feel ho
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}