'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'How does sign language recognition work?',
    answer: 'Sign Flow uses computer vision models (MediaPipe Hands, Pose, and Holistic) to detect hand landmarks and body pose from camera input. The gesture sequence is then classified and translated into natural language text. The system is designed to be modular — you can swap between MediaPipe, TensorFlow, or OpenCV recognition engines.',
  },
  {
    question: 'Do I need any special hardware?',
    answer: 'No. Sign Flow works in any modern web browser with a standard webcam and microphone. The 3D avatar runs on WebGL and requires no plugins or downloads.',
  },
  {
    question: 'Which sign languages are supported?',
    answer: 'The platform is architected to support multiple sign languages (ASL, BSL, ISL, and more). The recognition and avatar animation layers are language-agnostic — adding a new sign language requires training the recognition model on that language\'s gesture set.',
  },
  {
    question: 'Is my conversation data private?',
    answer: 'Yes. All data is stored in your Supabase database with row-level security enabled. Only authenticated users can access their own conversations. Audio and video are processed through secure API routes and never exposed to third parties without consent.',
  },
  {
    question: 'Can I switch AI providers?',
    answer: 'Absolutely. Sign Flow uses a factory pattern with pluggable adapters. You can switch between OpenAI Whisper, Google Speech, Azure, and Deepgram for speech-to-text; ElevenLabs, Azure, or Google for text-to-speech; and GPT, Claude, or Gemini for translation — all by changing a single environment variable.',
  },
  {
    question: 'Is Sign Flow WCAG compliant?',
    answer: 'Sign Flow is designed to meet WCAG 2.1 AA standards. This includes high contrast mode, large text mode, full keyboard navigation, screen reader support, and minimum 48x48px touch targets on all interactive elements.',
  },
  {
    question: 'Can I use Sign Flow offline?',
    answer: 'The 3D avatar and browser-based text-to-speech work offline. AI-powered features (sign recognition, premium TTS, translation) require an internet connection to communicate with the configured AI providers.',
  },
  {
    question: 'How does the 3D avatar work?',
    answer: 'The avatar is built with Three.js and React Three Fiber. It uses a rigged 3D model driven by sign language animation data. The avatar module is fully isolated — you can swap between MediaPipe, Ready Player Me, DeepMotion, NVIDIA ACE, or Unity avatar providers without changing any UI code.',
  },
];

function FaqItem({ faq, index }: { faq: typeof faqs[number]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <span className="pr-4 text-base font-medium">{faq.question}</span>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300',
            open && 'rotate-180'
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-muted-foreground leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-background">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold sm:text-4xl"
          >
            Frequently asked questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Everything you need to know about Sign Flow.
          </motion.p>
        </div>

        <div className="mx-auto max-w-3xl">
          {faqs.map((faq, i) => (
            <FaqItem key={faq.question} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
