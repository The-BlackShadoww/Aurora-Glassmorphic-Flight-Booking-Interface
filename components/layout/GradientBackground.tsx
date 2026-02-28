"use client";

import { motion } from "framer-motion";

export default function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 -left-40 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 dark:opacity-10"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-40 -right-40 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 dark:opacity-10"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-40 left-1/2 w-96 h-96 bg-emerald-700 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 dark:opacity-10"
        animate={{
          scale: [1, 1.4, 1],
          x: [0, -100, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/50" />
    </div>
  );
}
