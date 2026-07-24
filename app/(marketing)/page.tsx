import { HeroSection } from '@/components/marketing/HeroSection';
import { FeaturesSection } from '@/components/marketing/FeaturesSection';
import { HowItWorksSection } from '@/components/marketing/HowItWorksSection';
import { DemoPreview } from '@/components/marketing/DemoPreview';
import { PricingSection } from '@/components/marketing/PricingSection';
import { TestimonialsSection } from '@/components/marketing/TestimonialsSection';
import { FaqSection } from '@/components/marketing/FaqSection';
import { ContactSection } from '@/components/marketing/ContactSection';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DemoPreview />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
