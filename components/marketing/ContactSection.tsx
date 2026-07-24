'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Loader2, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-gradient-hero text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/4 h-72 w-72 rounded-full bg-brand-300 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-brand-500 blur-3xl" />
      </div>

      <div className="container-page relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold sm:text-4xl"
          >
            Get in touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-brand-200"
          >
            Questions, partnerships, or enterprise inquiries — we&apos;d love to hear from you.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-8"
        >
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <CheckCircle2 className="h-12 w-12 text-brand-300" />
              <h3 className="text-xl font-semibold">Message sent!</h3>
              <p className="text-sm text-brand-200">
                We&apos;ll get back to you within 24 hours.
              </p>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={() => setSent(false)}>
                Send another
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-brand-100">Name</Label>
                  <Input id="name" placeholder="Your name" className="bg-white/10 border-white/20 text-white placeholder:text-brand-300/50" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-brand-100">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-300/60" />
                    <Input id="email" type="email" placeholder="you@example.com" className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-brand-300/50" required />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-brand-100">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us what you need..."
                  className="min-h-[120px] bg-white/10 border-white/20 text-white placeholder:text-brand-300/50"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-white text-brand-900 hover:bg-brand-50 h-11" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          )}
        </motion.div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-brand-200">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-brand-300" />
            hello@signflow.app
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-brand-300" />
            24/7 Community Support
          </div>
        </div>
      </div>
    </section>
  );
}
