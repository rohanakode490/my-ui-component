import { AnimatePresence, motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useRef, useState } from 'react';
import p1 from '@/assets/p1.jpg';
import p2 from '@/assets/p2.jpg';

const MotionAvatarImage = motion(AvatarImage);

export function AnimatedAvatar() {
  const [imageToggled, setImageToggled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedSrc, setDisplayedSrc] = useState(p1);
  const isMountedRef = useRef(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleHoverEnter = () => {
    setIsLoading(true);
    timeoutRef.current = setTimeout(() => {
      // figure the next src
      const newSrc = imageToggled ? p1 : p2;

      // preload
      const img = new Image();
      img.onload = () => {
        if (!isMountedRef.current) return;
        // only update after load — prevents fallback flash
        setDisplayedSrc(newSrc);
        setImageToggled((prev) => !prev);
        setIsLoading(false);
        timeoutRef.current = null;
      };

      // handle load error gracefully
      img.onerror = () => {
        if (!isMountedRef.current) return;
        // keep old image, stop loading indicator
        setIsLoading(false);
        timeoutRef.current = null;
      };

      img.src = newSrc;
    }, 2000);
  };

  const handleHoverLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>
        {`@keyframes progress {
          from {
            stroke-dashoffset: 295.31;
          }
          to {
            stroke-dashoffset: 0;
          }
        }`}
      </style>
      <div
        className='relative inline-block'
        onMouseEnter={handleHoverEnter}
        onMouseLeave={handleHoverLeave}
      >
        <motion.div className='relative'>
          <Avatar className='w-20 h-20 sm:w-24 sm:h-24 border-4 border-primary/20 shrink-0 overflow-hidden shadow-xl'>
            <div className='relative w-full h-full'>
              <AnimatePresence mode='wait'>
                <MotionAvatarImage
                  key={displayedSrc}
                  src={displayedSrc}
                  alt='Rohan Akode Profile Picture'
                  animate={{ opacity: 1, scale: [1, 1.05, 1] }}
                  exit={{ opacity: 1, scale: 1 }}
                  transition={{
                    opacity: { duration: 0.2 },
                  }}
                />
              </AnimatePresence>
            </div>
            <AvatarFallback className='text-2xl font-bold bg-primary text-primary-foreground'>
              IMG
            </AvatarFallback>
          </Avatar>
          {isLoading && (
            <div className='absolute inset-0 w-full h-full'>
              <svg
                className='w-full h-full -rotate-90 scale-110'
                viewBox='0 0 100 100'
              >
                <circle
                  cx='50'
                  cy='50'
                  r='48'
                  stroke='currentColor'
                  strokeWidth='3'
                  fill='none'
                  className='text-primary/10'
                />
                <circle
                  cx='50'
                  cy='50'
                  r='48'
                  stroke='var(--primary)'
                  strokeWidth='3'
                  fill='none'
                  strokeLinecap='round'
                  strokeDasharray='301.59'
                  strokeDashoffset='301.59'
                  className='animate-[progress_2s_ease-in-out_forwards]'
                />
              </svg>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}
