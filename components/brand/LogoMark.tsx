import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoMarkProps {
  className?: string;
  size?: number;
}

export function LogoMark({ className, size = 40 }: LogoMarkProps) {
  return (
    <Image
      src="/assets/logo/WhatsApp_Image_2026-07-24_at_12.53.53_PM.jpeg"
      alt="Sign Flow"
      width={size}
      height={size}
      className={cn('rounded-lg shadow-soft', className)}
      priority
    />
  );
}
