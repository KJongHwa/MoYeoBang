import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideUpMotionProps {
  children: ReactNode;
  className?: string;
}

export default function SlideUpMotion({
  children,
  className,
  ...props
}: SlideUpMotionProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ duration: 0.9 }}
      className={`${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
