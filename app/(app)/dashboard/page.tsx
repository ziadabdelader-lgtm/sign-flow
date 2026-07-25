'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Languages,
  Volume2,
  Clock,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentConversations } from '@/components/dashboard/RecentConversations';
import { UsageChart } from '@/components/dashboard/UsageChart';
import { createClient } from '@/lib/supabase/client';
import { useTranslation } from 'react-i18next';

interface ConversationItem {
  id: string;
  title: string | null;
  messageCount: number;
  updatedAt: string;
}

export default function DashboardPage() {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalConversations: 0,
    totalTranslations: 0,
    totalSpeechMinutes: 0,
    activeConversations: 0,
  });
  const [conversations, setConversations] = useState<ConversationItem[]>([]);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: convs } = await supabase
        .from('conversations')
        .select('id, title, updated_at, status')
        .eq('owner_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(5);

      const formatted = (convs || []).map((c) => ({
        id: c.id,
        title: c.title,
        messageCount: 0,
        updatedAt: c.updated_at,
      }));

      setConversations(formatted);

      setStats({
        totalConversations: convs?.length || 0,
        totalTranslations: 0,
        totalSpeechMinutes: 0,
        activeConversations: convs?.filter((c) => c.status === 'active').length || 0,
      });
    })();
  }, []);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold">{t('dashboard')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t('welcomeBackHub')}
          </p>
        </div>
        <Button className="bg-brand-600 hover:bg-brand-700" asChild>
          <Link href="/conversation/new">
            <Plus className="mr-2 h-4 w-4" /> {t('newConversation')}
          </Link>
        </Button>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          label={t('totalConversations')}
          value={stats.totalConversations}
          icon={MessageSquare}
          trend="+12%"
          delay={0}
        />
        <StatsCard
          label={t('translations')}
          value={stats.totalTranslations}
          icon={Languages}
          trend="+8%"
          delay={0.1}
        />
        <StatsCard
          label={t('speechMinutes')}
          value={stats.totalSpeechMinutes}
          icon={Volume2}
          trend="+15%"
          delay={0.15}
        />
        <StatsCard
          label={t('activeNow')}
          value={stats.activeConversations}
          icon={Clock}
          delay={0.2}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentConversations conversations={conversations} />
        <UsageChart />
      </div>
    </div>
  );
}
