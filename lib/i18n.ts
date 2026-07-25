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
      avatar: 'Avatar',
      backToDashboard: 'Back to dashboard',
      conversation: 'Conversation',
      typeYourMessage: 'Type your message...',
      typeYourReply: 'Type your reply...',
      orType: 'or type',
      
      // Dashboard
      dashboard: 'Dashboard',
      welcome: 'Welcome',
      newConversation: 'New Conversation',
      recentConversations: 'Recent Conversations',
      history: 'History',
      settings: 'Settings',
      profile: 'Profile',
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
      avatar: 'الصورة الرمزية',
      backToDashboard: 'العودة إلى لوحة التحكم',
      conversation: 'محادثة',
      typeYourMessage: 'اكتب رسالتك...',
      typeYourReply: 'اكتب ردك...',
      orType: 'أو اكتب',
      
      // Dashboard
      dashboard: 'لوحة التحكم',
      welcome: 'مرحباً',
      newConversation: 'محادثة جديدة',
      recentConversations: 'المحادثات الأخيرة',
      history: 'السجل',
      settings: 'الإعدادات',
      profile: 'الملف الشخصي',
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
