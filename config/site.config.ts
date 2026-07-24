export const SITE_CONFIG = {
  name: 'Sign Flow',
  tagline: 'Accessible Communication Without Barriers',
  description:
    'AI-powered communication platform enabling real-time conversations between deaf and hearing users through sign language recognition, text-to-speech, and 3D avatar animations.',
  url: 'https://signflow.app',
  logo: '/assets/logo/WhatsApp_Image_2026-07-24_at_12.53.53_PM.jpeg',
  social: {
    twitter: '@signflow',
    email: 'hello@signflow.app',
  },
} as const;

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Demo', href: '#demo' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
] as const;

export const APP_NAV_LINKS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'New Conversation', href: '/conversation/new', icon: 'MessageSquarePlus' },
  { label: 'History', href: '/history', icon: 'History' },
  { label: 'Profile', href: '/profile', icon: 'User' },
  { label: 'Settings', href: '/settings', icon: 'Settings' },
  { label: 'Subscription', href: '/subscription', icon: 'CreditCard' },
] as const;
