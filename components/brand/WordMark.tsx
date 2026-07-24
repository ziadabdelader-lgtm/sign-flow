import { cn } from '@/lib/utils';

interface WordMarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-3xl',
};

export function WordMark({ className, size = 'md' }: WordMarkProps) {
  return (
    <span className={cn('font-bold tracking-tight text-gradient-brand', sizeMap[size], className)}>
      Sign Flow
    </span>
  );
}
