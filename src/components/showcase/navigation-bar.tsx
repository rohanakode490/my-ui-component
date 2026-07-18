import { motion, useAnimate } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const navigationItems = [
  { id: 'about', label: 'About' },
  { id: 'docs', label: 'Documentation' },
  { id: 'pricing', label: 'Pricing' },
];

export function NavigationBar() {
  const navRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const [activeSection, setActiveSection] = useState(navigationItems[0].id);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const [scope, animate] = useAnimate();

  const handleNavigate = (section: string) => {
    // Add navigation logic here
    setActiveSection(section);
  };

  useEffect(() => {
    let rAFId: number;

    const updateUnderline = () => {
      cancelAnimationFrame(rAFId);
      rAFId = requestAnimationFrame(() => {
        const targetSection = hoveredSection || activeSection;
        const activeEl = navRefs.current[targetSection];

        if (activeEl && scope.current) {
          const containerElement = scope.current.parentElement;
          if (!containerElement) return;

          const containerRect = containerElement.getBoundingClientRect();
          const activeRect = activeEl.getBoundingClientRect();

          const width = activeEl.offsetWidth;
          const center = activeRect.left + activeRect.width / 2;
          const left = center - containerRect.left - width / 2;

          animate(
            scope.current,
            { left, width },
            { type: 'spring', stiffness: 300, damping: 30 }
          );
        }
      });
    };

    updateUnderline();

    window.addEventListener('resize', updateUnderline);

    return () => {
      window.removeEventListener('resize', updateUnderline);
      cancelAnimationFrame(rAFId);
    };
  }, [hoveredSection, activeSection, animate, scope]);

  return (
    <div
      className='flex items-center justify-center mr-4 relative'
      onMouseLeave={() => setHoveredSection(null)}
    >
      {navigationItems.map((item, index) => {
        const isActive = activeSection === item.id;
        const isHovered = hoveredSection === item.id;

        return (
          <div className='relative' key={item.id}>
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Button
                key={item.id}
                ref={(el) => {
                  navRefs.current[item.id] = el;
                }}
                variant={isActive || isHovered ? 'default' : 'ghost'}
                size='sm'
                onClick={() => handleNavigate(item.id)}
                onMouseEnter={() => setHoveredSection(item.id)}
                className={`transform relative transition-all duration-300 bg-transparent text-[--text] cursor-pointer hover:bg-transparent hover:text-[--text-hover] hover:scale-110
                ${isActive ? 'shadow-md dark:shadow-[0_4px_6px_-1px_rgba(255,255,255,0.1)]' : ''}`}
              >
                {item.label}
              </Button>
            </motion.div>
          </div>
        );
      })}
      <motion.div
        ref={scope}
        className='absolute bottom-0 h-1 bg-primary rounded-full'
        initial={{ left: 0, width: 0 }}
      />
    </div>
  );
}
