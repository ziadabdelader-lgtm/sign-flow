'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConversationItem {
  id: string;
  title: string | null;
  messageCount: number;
  updatedAt: string;
}

interface RecentConversationsProps {
  conversations: ConversationItem[];
}

function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
}

export function RecentConversations({ conversations }: RecentConversationsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-2xl border border-border bg-card p-6 shadow-soft"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Recent Conversations</h3>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/history">
            View all <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </div>

      {conversations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <MessageSquare className="h-7 w-7 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">No conversations yet</p>
          <Button className="mt-4 bg-brand-600 hover:bg-brand-700" size="sm" asChild>
            <Link href="/conversation/new">Start a conversation</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {conversations.map((conv) => (
            <Link
              key={conv.id}
              href={`/conversation/${conv.id}`}
              className="flex items-center gap-4 rounded-lg p-3 hover:bg-muted/50 transition-colors group"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {conv.title || 'Untitled conversation'}
                </p>
                <p className="text-xs text-muted-foreground">{conv.messageCount} messages</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {timeAgo(conv.updatedAt)}
              </div>
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
}
