import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardMotionProps {
  children: ReactNode;
  className?: string;
  borderRadius?: string;
}

export default function CardMotion({
  children,
  className,
  borderRadius = '16px',
}: CardMotionProps) {
  return (
    <motion.figure
      initial={{
        borderRadius,
        boxShadow: '0px 0px 0px rgba(255, 255, 255, 0)',
      }}
      whileHover={{
        borderRadius,
        boxShadow: '0px 0px 0px 3px rgba(40, 36, 105, 1)',
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
