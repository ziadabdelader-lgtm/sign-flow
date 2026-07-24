import { Logo } from '@/components/brand/Logo';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-brand-300 blur-3xl" />
          <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-brand-500 blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <Link href="/">
            <Logo size="md" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold leading-tight">
              Accessible Communication
              <br />
              Without Barriers
            </h1>
            <p className="mt-4 text-lg text-brand-200 max-w-md">
              AI-powered sign language recognition, text-to-speech, and 3D avatar animations
              connecting deaf and hearing users in real time.
            </p>
          </div>
          <p className="text-sm text-brand-300">
            &copy; {new Date().getFullYear()} Sign Flow
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex justify-center">
            <Link href="/">
              <Logo size="md" />
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
