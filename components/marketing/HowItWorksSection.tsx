'use client';

import { motion } from 'framer-motion';
import { Hand, Brain, Volume2, Bot, Mic, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Hand,
    title: 'Deaf user signs or types',
    description: 'The deaf user records sign language with their camera or types text directly into the chat.',
  },
  {
    icon: Brain,
    title: 'AI translates instantly',
    description: 'Sign language recognition or text input is processed and translated into readable text.',
  },
  {
    icon: Volume2,
    title: 'Hearing user hears it',
    description: 'A single tap on the Speak button converts the translated text into natural AI-generated speech.',
  },
  {
    icon: Mic,
    title: 'Hearing user replies',
    description: 'The hearing user speaks or types their response — speech is transcribed automatically.',
  },
  {
    icon: Bot,
    title: 'Avatar performs signs',
    description: 'A 3D AI avatar animates the reply in sign language for the deaf user to see.',
  },
  {
    icon: ArrowRight,
    title: 'Conversation flows',
    description: 'The loop repeats — natural, bidirectional, real-time communication without barriers.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-muted/30">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold sm:text-4xl"
          >
            How it works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            A seamless loop connecting deaf and hearing users in real time.
          </motion.p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-brand-300 via-brand-500 to-brand-300 lg:block" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative flex flex-col gap-6 lg:flex-row lg:items-center ${
                  i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } lg:gap-12 lg:py-8`}
              >
                <div className="flex-1">
                  <div className={`rounded-2xl border border-border bg-card p-6 shadow-soft ${i % 2 === 0 ? 'lg:text-right' : ''}`}>
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white mb-4`}>
                      <step.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="hidden lg:flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white font-bold text-lg shadow-glow z-10">
                    {i + 1}
                  </div>
                </div>

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
