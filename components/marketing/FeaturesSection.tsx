'use client';

import { motion } from 'framer-motion';
import {
  Hand,
  Mic,
  MessageSquare,
  Volume2,
  Bot,
  Languages,
  Eye,
  Keyboard,
  ShieldCheck,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function FeaturesSection() {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: Hand,
      title: t('signLanguageRecognitionTitle'),
      description: t('signLanguageRecognitionDesc'),
    },
    {
      icon: Volume2,
      title: t('naturalTextToSpeechTitle'),
      description: t('naturalTextToSpeechDesc'),
    },
    {
      icon: Mic,
      title: t('speechToTextTitle'),
      description: t('speechToTextDesc'),
    },
    {
      icon: Bot,
      title: t('aiAvatarTitle'),
      description: t('aiAvatarDesc'),
    },
    {
      icon: Languages,
      title: t('aiTranslationTitle'),
      description: t('aiTranslationDesc'),
    },
    {
      icon: ShieldCheck,
      title: t('enterpriseSecurityTitle'),
      description: t('enterpriseSecurityDesc'),
    },
    {
      icon: Eye,
      title: t('wcagAccessibleTitle'),
      description: t('wcagAccessibleDesc'),
    },
    {
      icon: Keyboard,
      title: t('keyboardNavigationTitle'),
      description: t('keyboardNavigationDesc'),
    },
  ];

  return (
    <section id="features" className="py-24 lg:py-32 bg-background">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold sm:text-4xl"
          >
            {t('everythingYouNeed')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            {t('completeToolkit')}
          </motion.p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:shadow-soft-lg hover:border-brand-300/50 hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
