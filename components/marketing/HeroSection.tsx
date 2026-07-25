'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Hand, Mic, MessageSquare, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export function HeroSection() {
  const { t } = useTranslation();
  
  return (
    <section className="relative overflow-hidden bg-gradient-hero pt-20 pb-32 text-white">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-brand-300 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-brand-500 blur-3xl" />
      </div>

      <div className="container-page relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-brand-300" />
            {t('aiPoweredPlatform')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
          >
            {t('accessibleCommunication')}
            <br />
            <span className="bg-gradient-brand-soft bg-clip-text text-transparent">
              {t('withoutBarriers')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-brand-200 sm:text-xl max-w-2xl mx-auto"
          >
            {t('heroDescription')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="bg-white text-brand-900 hover:bg-brand-50 h-12 px-8" asChild>
              <Link href="/register">
                {t('startFree')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white h-12 px-8" asChild>
              <Link href="#demo" className="flex items-center gap-2">
                <Play className="h-4 w-4 fill-white" />
                {t('watchDemo')}
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-brand-200"
          >
            <div className="flex items-center gap-2">
              <Hand className="h-5 w-5 text-brand-300" />
              {t('signLanguageRecognition')}
            </div>
            <div className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-brand-300" />
              {t('realTimeSpeech')}
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-brand-300" />
              {t('instantTranslation')}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-300/50 to-transparent" />
    </section>
  );
}
