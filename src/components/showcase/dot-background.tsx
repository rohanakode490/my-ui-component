import { cn } from '@/lib/utils';

interface DotBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  dotSize?: number;
}

export function DotBackground({
  className,
  size = 24,
  dotSize = 1,
  children,
  ...props
}: DotBackgroundProps) {
  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden bg-background min-h-[inherit]',
        className
      )}
      {...props}
    >
      <div
        className='absolute inset-0 flex items-center justify-center [mask:radial-gradient(ellipse_at_center,transparent_20%,black)]'
        style={{
          backgroundImage: `radial-gradient(var(--foreground) ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${size}px ${size}px`,
          opacity: 0.3,
        }}
      />
      <div className='relative z-10'>{children}</div>
    </div>
  );
}
