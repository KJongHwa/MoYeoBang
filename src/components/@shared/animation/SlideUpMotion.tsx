import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideUpMotionProps {
  children: ReactNode;
  className?: string;
  distance?: number;
}

export default function SlideUpMotion({
  children,
  className,
  distance = 20,
  ...props
}: SlideUpMotionProps) {
  return (
    <motion.div
      initial={{ y: distance, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: distance, opacity: 0 }}
      transition={{ duration: 0.9 }}
      className={`${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
