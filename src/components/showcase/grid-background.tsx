import { cn } from '@/lib/utils';

interface GridBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  strokeWidth?: number;
}

export function GridBackground({
  className,
  size = 40,
  strokeWidth = 1,
  children,
  ...props
}: GridBackgroundProps) {
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
          backgroundImage: `linear-gradient(to right, var(--foreground) ${strokeWidth}px, transparent ${strokeWidth}px), linear-gradient(to bottom, var(--foreground) ${strokeWidth}px, transparent ${strokeWidth}px)`,
          backgroundSize: `${size}px ${size}px`,
          opacity: 0.3,
        }}
      />
      <div className='relative z-10'>{children}</div>
    </div>
  );
}
