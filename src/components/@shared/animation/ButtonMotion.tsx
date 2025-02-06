import { motion } from 'framer-motion';
import { ReactNode, MouseEvent } from 'react';

interface ButtonMotionProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function ButtonMotion({
  children,
  disabled,
  ...props
}: ButtonMotionProps) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.04 } : {}}
      transition={{ duration: 0.2 }}
      whileTap={
        !disabled
          ? {
              scale: 0.95,
              transition: {
                duration: 0.08,
              },
            }
          : {}
      }
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}
