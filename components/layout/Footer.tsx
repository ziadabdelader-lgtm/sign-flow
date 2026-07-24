import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-brand-950 text-brand-100">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" aria-label="Sign Flow home">
              <Logo size="md" />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-brand-200 leading-relaxed">
              Accessible communication without barriers. AI-powered sign language recognition,
              text-to-speech, and 3D avatar animations bridge the gap between deaf and hearing users.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#features" className="text-brand-200 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="text-brand-200 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#how-it-works" className="text-brand-200 hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/dashboard" className="text-brand-200 hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#faq" className="text-brand-200 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="#contact" className="text-brand-200 hover:text-white transition-colors">Contact</Link></li>
              <li><a href="mailto:hello@signflow.app" className="text-brand-200 hover:text-white transition-colors">hello@signflow.app</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-300">
            &copy; {new Date().getFullYear()} Sign Flow. All rights reserved.
          </p>
          <p className="text-xs text-brand-300 flex items-center gap-1.5">
            Built with <Heart className="h-3 w-3 fill-brand-300 text-brand-300" /> for accessibility
          </p>
        </div>
      </div>
    </footer>
  );
}
