import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SlotMotionProps {
  children: ReactNode;
  className?: string;
}

export default function SlotMotion({ children, className }: SlotMotionProps) {
  return (
    <motion.figure
      initial={{
        borderRadius: '24px',
        boxShadow: '0px 0px 0px rgba(255, 255, 255, 0)',
      }}
      whileHover={{
        borderRadius: '24px',
        boxShadow: '0px 0px 12px 4px rgba(102, 89, 244, 1)',
      }}
      transition={{ duration: 0.2 }}
      whileTap={{
        scale: 0.98,
        transition: {
          duration: 0.08,
        },
      }}
      className={className}
    >
      {children}
    </motion.figure>
  );
}
