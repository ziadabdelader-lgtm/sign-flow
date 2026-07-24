'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, CreditCard, Zap, Crown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/lib/supabase/client';
import type { Subscription } from '@/types/subscription';
import { cn } from '@/lib/utils';

const plans = [
  {
    id: 'free' as const,
    name: 'Free',
    icon: Zap,
    price: 0,
    features: ['10 conversations/month', '50 AI translations/month', 'Browser TTS', 'Basic typing'],
  },
  {
    id: 'pro' as const,
    name: 'Pro',
    icon: Crown,
    price: 24,
    features: ['Unlimited conversations', 'Premium AI voices', 'Sign recognition', '3D avatar', 'Export history', 'Priority support'],
  },
  {
    id: 'enterprise' as const,
    name: 'Enterprise',
    icon: CreditCard,
    price: null,
    features: ['Everything in Pro', 'Custom AI providers', 'Dedicated avatar', 'SSO + security', 'Analytics', 'SLA guarantee'],
  },
];

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      setSubscription(data as Subscription);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Subscription</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your plan and billing.</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Current Plan</p>
            <div className="mt-1 flex items-center gap-3">
              <p className="text-2xl font-bold capitalize">{subscription?.plan || 'Free'}</p>
              {subscription?.status === 'active' && (
                <Badge className="bg-success/10 text-success border-success/20">Active</Badge>
              )}
            </div>
            {subscription?.current_period_end && (
              <p className="mt-2 text-xs text-muted-foreground">
                Renews on {new Date(subscription.current_period_end).toLocaleDateString()}
              </p>
            )}
          </div>
          {subscription?.plan !== 'free' && (
            <Button variant="outline">Manage Billing</Button>
          )}
        </div>
      </Card>

      <div className="grid gap-6 sm:grid-cols-3">
        {plans.map((plan, i) => {
          const isCurrent = (subscription?.plan || 'free') === plan.id;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className={cn(
                'p-6 h-full flex flex-col',
                plan.id === 'pro' && 'border-brand-500 shadow-glow'
              )}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
                    <plan.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  {isCurrent && <Badge className="ml-auto bg-brand-600">Current</Badge>}
                </div>

                <div className="mb-4">
                  {plan.price !== null ? (
                    <><span className="text-3xl font-bold">${plan.price}</span><span className="text-muted-foreground">/mo</span></>
                  ) : (
                    <span className="text-3xl font-bold">Custom</span>
                  )}
                </div>

                <ul className="flex-1 space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-brand-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  disabled={isCurrent}
                  className={cn(
                    'w-full',
                    plan.id === 'pro' ? 'bg-brand-600 hover:bg-brand-700' : 'bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-900/30 dark:text-brand-200',
                    isCurrent && 'opacity-50'
                  )}
                >
                  {isCurrent ? 'Current Plan' : plan.id === 'enterprise' ? 'Contact Sales' : `Upgrade to ${plan.name}`}
                </Button>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
