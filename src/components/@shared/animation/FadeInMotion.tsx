import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInMotionProps {
  children: ReactNode;
  className?: string;
}

function FadeInMotion({ children, className }: FadeInMotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default FadeInMotion;
