'use client';

import { motion } from 'framer-motion';
import { Play, Hand, Mic, Volume2, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DemoPreview() {
  return (
    <section id="demo" className="py-24 lg:py-32 bg-gradient-hero text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-0 h-72 w-72 rounded-full bg-brand-300 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 h-72 w-72 rounded-full bg-brand-500 blur-3xl" />
      </div>

      <div className="container-page relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold sm:text-4xl"
          >
            See it in action
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-brand-200"
          >
            A preview of the split-screen conversation experience.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-5xl rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-8 shadow-soft-lg"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-brand-950/50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Hand className="h-5 w-5 text-brand-300" />
                <span className="text-sm font-medium text-brand-200">Deaf User Panel</span>
              </div>
              <div className="space-y-3">
                <div className="rounded-lg bg-brand-700/40 p-3 text-sm">
                  Hello, can you help me find the library?
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-brand-500 hover:bg-brand-400">
                    <Hand className="mr-2 h-4 w-4" /> Camera
                  </Button>
                  <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <Volume2 className="mr-2 h-4 w-4" /> Speak
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-brand-950/50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Mic className="h-5 w-5 text-brand-300" />
                <span className="text-sm font-medium text-brand-200">Hearing User Panel</span>
              </div>
              <div className="space-y-3">
                <div className="rounded-lg bg-brand-600/40 p-3 text-sm text-right ml-auto max-w-[80%]">
                  Sure! Go straight for two blocks, then turn left.
                </div>
                <div className="flex gap-2 justify-end">
                  <Button size="sm" className="bg-brand-500 hover:bg-brand-400">
                    <Mic className="mr-2 h-4 w-4" /> Mic
                  </Button>
                  <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <Bot className="mr-2 h-4 w-4" /> Avatar
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button size="lg" className="bg-white text-brand-900 hover:bg-brand-50">
              <Play className="mr-2 h-5 w-5" /> Watch Full Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
