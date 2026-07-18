import { useState, useEffect, useRef } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from './button';

type CopyButtonProps = {
  text: string;
  className?: string;
};

export const CopyButton = ({ text, className = '' }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }

  return (
    <Button
      onClick={handleCopy}
      size='sm'
      variant='outline'
      className={`bg-background/80 backdrop-blur-sm ${className}`}
    >
      {copied ? (
        <>
          <Check className='h-3 w-3' />
          Copied
        </>
      ) : (
        <Copy className='h-3 w-3' />
      )}
    </Button>
  );
};
