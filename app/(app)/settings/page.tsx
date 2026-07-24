'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon,
  Eye,
  Type,
  Mic,
  Volume2,
  Languages,
  Bot,
  Loader2,
  Save,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/lib/supabase/client';
import { useTheme } from 'next-themes';
import { AI_CONFIG } from '@/config/ai.config';
import type { UserSettings } from '@/types/settings';

export default function SettingsPage() {
  const { setTheme } = useTheme();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from('settings')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      setSettings(data as UserSettings);
      setLoading(false);
    })();
  }, []);

  function updateSetting<K extends keyof UserSettings>(key: K, value: UserSettings[K]) {
    setSettings((prev) => prev ? { ...prev, [key]: value } : prev);
  }

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    const supabase = createClient();
    await supabase.from('settings').upsert({
      user_id: settings.user_id,
      theme: settings.theme,
      stt_provider: settings.stt_provider,
      tts_provider: settings.tts_provider,
      translation_provider: settings.translation_provider,
      avatar_provider: settings.avatar_provider,
      language: settings.language,
      accessibility_mode: settings.accessibility_mode,
      high_contrast: settings.high_contrast,
      large_text: settings.large_text,
      updated_at: new Date().toISOString(),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Customize your experience and AI providers.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
            <SettingsIcon className="h-5 w-5 text-brand-600" /> Appearance
          </h2>
          <p className="text-sm text-muted-foreground mb-4">Theme and display preferences.</p>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Theme</Label>
              <Select
                value={settings?.theme || 'system'}
                onValueChange={(v) => {
                  updateSetting('theme', v as UserSettings['theme']);
                  setTheme(v);
                }}
              >
                <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="highContrast">High Contrast</Label>
              </div>
              <Switch
                id="highContrast"
                checked={settings?.high_contrast || false}
                onCheckedChange={(v) => updateSetting('high_contrast', v)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="largeText">Large Text</Label>
              </div>
              <Switch
                id="largeText"
                checked={settings?.large_text || false}
                onCheckedChange={(v) => updateSetting('large_text', v)}
              />
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
            <Languages className="h-5 w-5 text-brand-600" /> AI Providers
          </h2>
          <p className="text-sm text-muted-foreground mb-4">Choose which AI services power your conversations.</p>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mic className="h-4 w-4 text-muted-foreground" />
                <Label>Speech to Text</Label>
              </div>
              <Select
                value={settings?.stt_provider || AI_CONFIG.stt.provider}
                onValueChange={(v) => updateSetting('stt_provider', v)}
              >
                <SelectTrigger className="w-40 capitalize"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {AI_CONFIG.stt.providers.map((p) => (
                    <SelectItem key={p} value={p} className="capitalize">{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <Label>Text to Speech</Label>
              </div>
              <Select
                value={settings?.tts_provider || AI_CONFIG.tts.provider}
                onValueChange={(v) => updateSetting('tts_provider', v)}
              >
                <SelectTrigger className="w-40 capitalize"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {AI_CONFIG.tts.providers.map((p) => (
                    <SelectItem key={p} value={p} className="capitalize">{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Languages className="h-4 w-4 text-muted-foreground" />
                <Label>Translation</Label>
              </div>
              <Select
                value={settings?.translation_provider || AI_CONFIG.translation.provider}
                onValueChange={(v) => updateSetting('translation_provider', v)}
              >
                <SelectTrigger className="w-40 capitalize"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {AI_CONFIG.translation.providers.map((p) => (
                    <SelectItem key={p} value={p} className="capitalize">{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-muted-foreground" />
                <Label>Avatar</Label>
              </div>
              <Select
                value={settings?.avatar_provider || AI_CONFIG.avatar.provider}
                onValueChange={(v) => updateSetting('avatar_provider', v)}
              >
                <SelectTrigger className="w-40 capitalize"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {AI_CONFIG.avatar.providers.map((p) => (
                    <SelectItem key={p} value={p} className="capitalize">{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} disabled={saving} className="bg-brand-600 hover:bg-brand-700">
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
        {saved && <span className="text-sm text-success">Settings saved!</span>}
      </div>
    </div>
  );
}
