import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { CodeIcon } from '@/assets/code-icon';
import { Menu } from 'lucide-react';
import { ThemeButton } from './ui/theme-button';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className='sticky top-0 pt-2 w-full z-50 border-b border-border/40 bg-background/95 backdrop-blur'
    >
      <div className='container flex items-center justify-between'>
        <Link to='/' className='rounded-lg bg-gradient-primary p-2'>
          <CodeIcon />
        </Link>

        {/* Desktop View */}
        <div className='hidden md:flex items-center justify-center gap-4 text-foreground'>
          <Link
            to='/'
            className='text-sm font-medium transition-colors hover:text-primary'
          >
            Home
          </Link>
          <Link
            to='/documentation'
            className='text-sm font-medium transition-colors hover:text-primary'
          >
            Docs
          </Link>
          <ThemeButton />
        </div>

        {/* Mobile Nav View*/}
        <div className='flex md:hidden items-center gap-2'>
          <ThemeButton />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Menu className='h-5 w-5 text-foreground' />
              </Button>
            </SheetTrigger>
            <SheetContent className='w-[40%]'>
              <div className='flex flex-col gap-6 mt-8 px-3'>
                {/* TODO: CURRENT PAGE SHOULD CONTAIN text-lg and bold */}
                <Link
                  to='/'
                  className='px-2 text-lg font-semibold transition-colors rounded-lg hover:text-primary hover:bg-secondary'
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to='/documentation'
                  className='px-2 text-sm font-medium transition-colors rounded-lg hover:text-primary hover:bg-primary-foreground'
                  onClick={() => setIsOpen(false)}
                >
                  Docs
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};
