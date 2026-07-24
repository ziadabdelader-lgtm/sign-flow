'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const plans = [
  {
    id: 'free' as const,
    name: 'Free',
    price: 0,
    interval: 'month',
    description: 'For trying out Sign Flow',
    features: [
      '10 conversations per month',
      '50 AI translations per month',
      'Text-to-speech (browser voice)',
      'Basic sign typing',
      'Community support',
    ],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    id: 'pro' as const,
    name: 'Pro',
    price: 24,
    interval: 'month',
    description: 'For regular use and professionals',
    features: [
      'Unlimited conversations',
      'Unlimited AI translations',
      'Premium AI voices (ElevenLabs)',
      'Sign language recognition',
      '3D avatar with custom avatars',
      'Conversation history export',
      'Priority support',
    ],
    cta: 'Start Pro Trial',
    highlighted: true,
  },
  {
    id: 'enterprise' as const,
    name: 'Enterprise',
    price: null,
    interval: 'month',
    description: 'For organizations and institutions',
    features: [
      'Everything in Pro',
      'Custom AI provider integration',
      'Dedicated avatar branding',
      'SSO + advanced security',
      'Usage analytics dashboard',
      'Custom sign language models',
      'Dedicated account manager',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-background">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold sm:text-4xl"
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Start free. Upgrade when you need more.
          </motion.p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-border bg-card p-1">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                !annual ? 'bg-brand-600 text-white' : 'text-muted-foreground'
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                annual ? 'bg-brand-600 text-white' : 'text-muted-foreground'
              )}
            >
              Annual <span className="text-brand-300">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={cn(
                'rounded-2xl border bg-card p-8 shadow-soft transition-all',
                plan.highlighted
                  ? 'border-brand-500 shadow-glow-lg lg:scale-105 relative'
                  : 'border-border hover:shadow-soft-lg'
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-4 py-1 text-xs font-semibold text-white shadow-glow">
                  Most Popular
                </div>
              )}

              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>

              <div className="mt-6">
                {plan.price !== null ? (
                  <>
                    <span className="text-4xl font-bold">
                      ${annual ? Math.round(plan.price * 0.8) : plan.price}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </>
                ) : (
                  <span className="text-4xl font-bold">Custom</span>
                )}
              </div>

              <Button
                className={cn(
                  'mt-6 w-full h-11',
                  plan.highlighted
                    ? 'bg-brand-600 hover:bg-brand-700'
                    : 'bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-900/30 dark:text-brand-200'
                )}
                asChild
              >
                <a href={plan.id === 'enterprise' ? '#contact' : '/register'}>{plan.cta}</a>
              </Button>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-brand-500 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
