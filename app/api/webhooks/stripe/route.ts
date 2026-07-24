import { NextRequest, NextResponse } from 'next/server';

// TODO: Implement Stripe webhook handler when STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET are configured.
//  1. Verify the webhook signature using Stripe's constructEventAsync
//  2. Handle event types: customer.subscription.created, .updated, .deleted
//  3. Update the subscriptions table accordingly
//  4. Return 200 for processed events, 400 for invalid signatures

export async function POST(_req: NextRequest) {
  return NextResponse.json(
    { error: 'Stripe webhook not configured. Set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET in .env.local' },
    { status: 501 }
  );
}
