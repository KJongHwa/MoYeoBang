import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInListMotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

function FadeInListMotion({
  children,
  className,
  delay,
  duration,
}: FadeInListMotionProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration }}
      className={className}
    >
      {children}
    </motion.li>
  );
}

export default FadeInListMotion;
