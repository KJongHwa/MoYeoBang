import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideDownMotionProps {
  children: ReactNode;
  className?: string;
}

export default function SlideDownMotion({
  children,
  className,
  ...props
}: SlideDownMotionProps) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`relative z-10 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
