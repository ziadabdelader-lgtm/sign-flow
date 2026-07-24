import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { width: 32, height: 32, text: 'text-lg' },
  md: { width: 40, height: 40, text: 'text-xl' },
  lg: { width: 56, height: 56, text: 'text-2xl' },
};

export function Logo({ className, showText = true, size = 'md' }: LogoProps) {
  const dims = sizeMap[size];

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <Image
        src="/assets/logo/WhatsApp_Image_2026-07-24_at_12.53.53_PM.jpeg"
        alt="Sign Flow logo"
        width={dims.width}
        height={dims.height}
        className="rounded-lg shadow-soft"
        priority
      />
      {showText && (
        <span className={cn('font-bold tracking-tight text-gradient-brand', dims.text)}>
          Sign Flow
        </span>
      )}
    </div>
  );
}
