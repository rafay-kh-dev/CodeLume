import React from "react";
import { motion } from "framer-motion";

export default function PageTransition({ children }) {
  return (
    <motion.div
      // Page enter starts from the left (x: -30)
      initial={{ opacity: 0, x: -30 }}
      // Page settles perfectly in the center (x: 0)
      animate={{ opacity: 1, x: 0 }}
      // Page exits by sliding out to the right (x: 30)
      exit={{ opacity: 0, x: 30 }}
      // Premium easing for that silky smooth Apple-like flow
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}