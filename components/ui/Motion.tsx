'use client';

import { motion } from 'framer-motion';

export function MotionDiv({ children, ...props }: any) {
  return <motion.div {...props}>{children}</motion.div>;
}

export function MotionSection({ children, ...props }: any) {
  return <motion.section {...props}>{children}</motion.section>;
}

export function MotionH1({ children, ...props }: any) {
  return <motion.h1 {...props}>{children}</motion.h1>;
}

export function MotionP({ children, ...props }: any) {
  return <motion.p {...props}>{children}</motion.p>;
}
