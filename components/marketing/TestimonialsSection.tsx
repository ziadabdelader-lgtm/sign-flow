'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Speech Therapist',
    content: 'Sign Flow has transformed how I work with deaf clients. The real-time avatar makes sessions so much more engaging and effective.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Deaf Community Advocate',
    content: 'Finally, a platform that treats sign language with the respect it deserves. The sign recognition is remarkably accurate.',
    rating: 5,
  },
  {
    name: 'Dr. Amira Hassan',
    role: 'Audiologist',
    content: 'I recommend Sign Flow to every patient who struggles with communication. It bridges the gap in ways nothing else does.',
    rating: 5,
  },
  {
    name: 'Liam O\'Sullivan',
    role: 'Special Education Teacher',
    content: 'My students light up when they see the 3D avatar signing back to them. It\'s not just a tool — it\'s a breakthrough.',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'Accessibility Consultant',
    content: 'The attention to WCAG compliance is outstanding. This is how accessibility products should be built.',
    rating: 5,
  },
  {
    name: 'James Rodriguez',
    role: 'Parent of a deaf child',
    content: 'Sign Flow gave our family a way to communicate that we never had before. It\'s life-changing technology.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold sm:text-4xl"
          >
            Loved by the community
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Trusted by professionals, advocates, and families worldwide.
          </motion.p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-brand-400 text-brand-400" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-foreground/90">&ldquo;{t.content}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-sm font-semibold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
