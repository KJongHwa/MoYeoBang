import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideTextMotionProps {
  children: ReactNode;
}

export default function SlideTextMotion({ children }: SlideTextMotionProps) {
  if (typeof children !== 'string') {
    return null;
  }

  return (
    <>
      {children.split('').map((char, index) => (
        <motion.span
          key={char + Math.random()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          {char}
        </motion.span>
      ))}
    </>
  );
}
