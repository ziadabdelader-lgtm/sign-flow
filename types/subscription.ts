export type PlanType = 'free' | 'pro' | 'enterprise';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing';

export interface Subscription {
  id: string;
  user_id: string;
  plan: PlanType;
  status: SubscriptionStatus;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
}

export interface Plan {
  id: PlanType;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    conversationsPerMonth: number;
    messagesPerMonth: number;
    avatarMinutes: number;
  };
}
