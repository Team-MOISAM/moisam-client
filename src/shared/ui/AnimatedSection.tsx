import React, { forwardRef } from "react";
import { motion } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  isVisible: boolean;
  index: number;
}

export const AnimatedSection = forwardRef<HTMLDivElement, AnimatedSectionProps>(
  ({ children, isVisible, index }, ref) => {
    return (
      <motion.div
        ref={ref}
        data-index={index}
        initial={{
          opacity: 0,
          y: 80,
          scale: 0.96,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 80,
          scale: isVisible ? 1 : 0.96,
        }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: isVisible ? 0.2 : 0,
        }}
        className="w-full">
        {children}
      </motion.div>
    );
  }
);
