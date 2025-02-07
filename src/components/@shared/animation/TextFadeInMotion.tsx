import { motion } from 'framer-motion';
import { ReactNode, Children, isValidElement } from 'react';

interface TextFadeInMotionProps {
  children: ReactNode;
  className?: string;
  onComplete?: () => void;
}

export default function TextFadeInMotion({
  children,
  className,
  onComplete,
}: TextFadeInMotionProps) {
  const textContent = Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string') {
        return child;
      }
      if (isValidElement(child) && child.props.children) {
        return child.props.children;
      }
      return '';
    })
    .join('');

  return (
    <span className={className}>
      {textContent.split('').map((char, index) => (
        <motion.span
          key={`${char}-${Math.random()}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          onAnimationComplete={() => {
            if (index === textContent.length - 1 && onComplete) {
              onComplete();
            }
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
