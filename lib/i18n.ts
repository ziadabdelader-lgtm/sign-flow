import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      features: 'Features',
      howItWorks: 'How It Works',
      pricing: 'Pricing',
      about: 'About',
      signIn: 'Sign In',
      getStarted: 'Get Started',
      
      // Hero Section
      aiPoweredPlatform: 'AI-Powered Accessibility Platform',
      accessibleCommunication: 'Accessible Communication',
      withoutBarriers: 'Without Barriers',
      heroDescription: 'Sign Flow bridges the gap between deaf and hearing users with real-time sign language recognition, AI text-to-speech, and lifelike 3D avatar animations.',
      startFree: 'Start Free',
      watchDemo: 'Watch Demo',
      signLanguageRecognition: 'Sign Language Recognition',
      realTimeSpeech: 'Real-Time Speech',
      instantTranslation: 'Instant Translation',
      
      // Features Section
      everythingYouNeed: 'Everything you need to communicate',
      completeToolkit: 'A complete AI-powered toolkit designed for accessibility from the ground up.',
      signLanguageRecognitionTitle: 'Sign Language Recognition',
      signLanguageRecognitionDesc: 'Record sign language via camera and get instant text translation using MediaPipe and TensorFlow models.',
      naturalTextToSpeechTitle: 'Natural Text-to-Speech',
      naturalTextToSpeechDesc: 'Convert any message into lifelike speech with ElevenLabs, Azure Neural, or Google TTS voices.',
      speechToTextTitle: 'Speech-to-Text',
      speechToTextDesc: 'Hearing users speak naturally — Whisper, Deepgram, and Azure transcribe in real time.',
      aiAvatarTitle: '3D AI Avatar',
      aiAvatarDesc: 'A fully animated 3D avatar performs sign language so deaf users can see spoken words come alive.',
      aiTranslationTitle: 'AI Translation Layer',
      aiTranslationDesc: 'Powered by GPT, Claude, and Gemini — translate between spoken and sign language seamlessly.',
      enterpriseSecurityTitle: 'Enterprise Security',
      enterpriseSecurityDesc: 'Row-level security, protected APIs, rate limiting, and full input validation on every request.',
      wcagAccessibleTitle: 'WCAG AA Accessible',
      wcagAccessibleDesc: 'High contrast mode, large text, keyboard navigation, and screen reader support built in.',
      keyboardNavigationTitle: 'Keyboard Navigation',
      keyboardNavigationDesc: 'Every interaction works without a mouse — fully navigable via Tab, Enter, Space, and Escape.',
      
      // Dashboard
      dashboard: 'Dashboard',
      welcome: 'Welcome',
      welcomeBackHub: 'Welcome back to your communication hub.',
      newConversation: 'New Conversation',
      totalConversations: 'Total Conversations',
      translations: 'Translations',
      speechMinutes: 'Speech Minutes',
      activeNow: 'Active Now',
      recentConversations: 'Recent Conversations',
      usageChart: 'Usage Chart',
      
      // Settings
      settings: 'Settings',
      customizeExperience: 'Customize your experience and AI providers.',
      appearance: 'Appearance',
      themeDisplayPreferences: 'Theme and display preferences.',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
      highContrast: 'High Contrast',
      largeText: 'Large Text',
      aiProviders: 'AI Providers',
      chooseAiServices: 'Choose which AI services power your conversations.',
      speechToText: 'Speech to Text',
      textToSpeech: 'Text to Speech',
      translation: 'Translation',
      avatar: 'Avatar',
      saveSettings: 'Save Settings',
      saving: 'Saving...',
      settingsSaved: 'Settings saved!',
      
      // Auth
      welcomeBack: 'Welcome back',
      signInToContinue: 'Sign in to continue to Sign Flow',
      email: 'Email',
      password: 'Password',
      dontHaveAccount: "Don't have an account?",
      createOne: 'Create one',
      createAccount: 'Create your account',
      startCommunicating: 'Start communicating without barriers',
      displayName: 'Display Name',
      yourName: 'Your name',
      atLeast8Chars: 'At least 8 characters',
      createAccountBtn: 'Create Account',
      alreadyHaveAccount: 'Already have an account?',
      signInLink: 'Sign in',
      emailPlaceholder: 'you@example.com',
      passwordPlaceholder: '••••••••',
      nameMustBe2Chars: 'Name must be at least 2 characters',
      enterValidEmail: 'Enter a valid email address',
      passwordMin6: 'Password must be at least 6 characters',
      passwordMin8: 'Password must be at least 8 characters',
      
      // Conversation
      you: 'You',
      aroundPeople: 'Around People',
      signLanguageTextInput: 'Sign language & text input',
      voiceTextInput: 'Voice & text input',
      connected: 'Connected',
      backToDashboard: 'Back to dashboard',
      conversation: 'Conversation',
      typeYourMessage: 'Type your message...',
      typeYourReply: 'Type your reply...',
      orType: 'or type',
      
      // Profile & History
      profile: 'Profile',
      history: 'History',
      subscription: 'Subscription',
      logout: 'Logout',
    },
  },
  ar: {
    translation: {
      // Navigation
      features: 'المميزات',
      howItWorks: 'كيف يعمل',
      pricing: 'الأسعار',
      about: 'عن التطبيق',
      signIn: 'تسجيل الدخول',
      getStarted: 'ابدأ الآن',
      
      // Hero Section
      aiPoweredPlatform: 'منصة إمكانية الوصول المدعومة بالذكاء الاصطناعي',
      accessibleCommunication: 'تواصل سهل الوصول',
      withoutBarriers: 'بدون حواجز',
      heroDescription: 'ساين فلو يسد الفجوة بين المستخدمين الصم والسامعين من خلال التعرف على لغة الإشارة في الوقت الفعلي، وتحويل النص إلى كلام بالذكاء الاصطناعي، ورسوم متحركة ثلاثية الأبعاد.',
      startFree: 'ابدأ مجاناً',
      watchDemo: 'شاهد العرض',
      signLanguageRecognition: 'التعرف على لغة الإشارة',
      realTimeSpeech: 'الكلام في الوقت الفعلي',
      instantTranslation: 'ترجمة فورية',
      
      // Features Section
      everythingYouNeed: 'كل ما تحتاجه للتواصل',
      completeToolkit: 'مجموعة أدوات كاملة مدعومة بالذكاء الاصطناعي مصممة لإمكانية الوصول من الأساس.',
      signLanguageRecognitionTitle: 'التعرف على لغة الإشارة',
      signLanguageRecognitionDesc: 'سجل لغة الإشارة عبر الكاميرا واحصل على ترجمة نصية فورية باستخدام نماذج MediaPipe و TensorFlow.',
      naturalTextToSpeechTitle: 'تحويل النص إلى كلام طبيعي',
      naturalTextToSpeechDesc: 'حول أي رسالة إلى كلام واقعي مع ElevenLabs أو Azure Neural أو Google TTS.',
      speechToTextTitle: 'تحويل الكلام إلى نص',
      speechToTextDesc: 'يتحدث المستخدمون السامعون بشكل طبيعي — Whisper و Deepgram و Azure ينسخون في الوقت الفعلي.',
      aiAvatarTitle: 'صورة رمزية ثلاثية الأبعاد بالذكاء الاصطناعي',
      aiAvatarDesc: 'صورة رمزية متحركة بالكامل تؤدي لغة الإشارة حتى يتمكن المستخدمون الصم من رؤية الكلمات المنطوقة.',
      aiTranslationTitle: 'طبقة الترجمة بالذكاء الاصطناعي',
      aiTranslationDesc: 'مدعومة بـ GPT و Claude و Gemini — ترجم بين اللغة المنطوقة ولغة الإشارة بسلاسة.',
      enterpriseSecurityTitle: 'أمان على مستوى المؤسسات',
      enterpriseSecurityDesc: 'أمان على مستوى الصف، واجهات برمجة محمية، تحديد المعدل، والتحقق الكامل من الإدخال في كل طلب.',
      wcagAccessibleTitle: 'متوافق مع WCAG AA',
      wcagAccessibleDesc: 'وضع التباين العالي، نص كبير، التنقل بلوحة المفاتيح، ودعم قارئ الشاشة مدمج.',
      keyboardNavigationTitle: 'التنقل بلوحة المفاتيح',
      keyboardNavigationDesc: 'كل تفاعل يعمل بدون ماوس — قابل للتنقل بالكامل عبر Tab و Enter و Space و Escape.',
      
      // Dashboard
      dashboard: 'لوحة التحكم',
      welcome: 'مرحباً',
      welcomeBackHub: 'مرحباً بعودتك إلى مركز الاتصالات الخاص بك.',
      newConversation: 'محادثة جديدة',
      totalConversations: 'إجمالي المحادثات',
      translations: 'الترجمات',
      speechMinutes: 'دقائق الكلام',
      activeNow: 'نشط الآن',
      recentConversations: 'المحادثات الأخيرة',
      usageChart: 'مخطط الاستخدام',
      
      // Settings
      settings: 'الإعدادات',
      customizeExperience: 'خصص تجربتك ومزودي الذكاء الاصطناعي.',
      appearance: 'المظهر',
      themeDisplayPreferences: 'السمة وتفضيلات العرض.',
      theme: 'السمة',
      light: 'فاتح',
      dark: 'داكن',
      system: 'النظام',
      highContrast: 'تباين عالي',
      largeText: 'نص كبير',
      aiProviders: 'مزودي الذكاء الاصطناعي',
      chooseAiServices: 'اختر خدمات الذكاء الاصطناعي التي تشغل محادثاتك.',
      speechToText: 'تحويل الكلام إلى نص',
      textToSpeech: 'تحويل النص إلى كلام',
      translation: 'الترجمة',
      avatar: 'الصورة الرمزية',
      saveSettings: 'حفظ الإعدادات',
      saving: 'جاري الحفظ...',
      settingsSaved: 'تم حفظ الإعدادات!',
      
      // Auth
      welcomeBack: 'مرحباً بعودتك',
      signInToContinue: 'سجل الدخول للمتابعة إلى ساين فلو',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      dontHaveAccount: 'ليس لديك حساب؟',
      createOne: 'إنشاء حساب',
      createAccount: 'إنشاء حسابك',
      startCommunicating: 'ابدأ التواصل بدون حواجز',
      displayName: 'الاسم',
      yourName: 'اسمك',
      atLeast8Chars: '8 أحرف على الأقل',
      createAccountBtn: 'إنشاء حساب',
      alreadyHaveAccount: 'لديك حساب بالفعل؟',
      signInLink: 'تسجيل الدخول',
      emailPlaceholder: 'you@example.com',
      passwordPlaceholder: '••••••••',
      nameMustBe2Chars: 'يجب أن يكون الاسم حرفين على الأقل',
      enterValidEmail: 'أدخل عنوان بريد إلكتروني صالح',
      passwordMin6: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل',
      passwordMin8: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل',
      
      // Conversation
      you: 'أنت',
      aroundPeople: 'الأشخاص حولك',
      signLanguageTextInput: 'لغة الإشارة والنص',
      voiceTextInput: 'الصوت والنص',
      connected: 'متصل',
      backToDashboard: 'العودة إلى لوحة التحكم',
      conversation: 'محادثة',
      typeYourMessage: 'اكتب رسالتك...',
      typeYourReply: 'اكتب ردك...',
      orType: 'أو اكتب',
      
      // Profile & History
      profile: 'الملف الشخصي',
      history: 'السجل',
      subscription: 'الاشتراك',
      logout: 'تسجيل الخروج',
    },
  },
};

// Only initialize on client side
if (typeof window !== 'undefined') {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },
      react: {
        useSuspense: false, // Disable suspense to prevent hydration issues
      },
    });
}

export default i18n;
