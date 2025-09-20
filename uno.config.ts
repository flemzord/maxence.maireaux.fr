import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    // Base theme colors - Enhanced palette
    {
      'bg-main': 'bg-slate-50 dark:bg-gray-950',
      'text-main': 'text-gray-700 dark:text-gray-300',
      'text-link': 'text-gray-900 dark:text-white',
      'border-main': 'border-gray-200 dark:border-gray-700',
    },
    // Responsive containers and spacing
    {
      'container-sm': 'px-4 sm:px-6 lg:px-8',
      'container-content': 'max-w-3xl mx-auto',
      'container-wide': 'max-w-6xl mx-auto',
      'section-spacing': 'py-12 sm:py-16 lg:py-20',
      'element-spacing': 'mb-6 sm:mb-8',
    },
    // Responsive typography
    {
      'text-display': 'text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight',
      'text-title': 'text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight',
      'text-subtitle': 'text-lg sm:text-xl opacity-70 leading-relaxed',
      'text-body': 'text-base sm:text-lg leading-relaxed',
      'text-small': 'text-sm sm:text-base',
    },
    // Navigation and interactive elements
    {
      'nav-link': 'text-link opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer min-h-11 flex items-center',
      'prose-link': 'text-link text-nowrap cursor-pointer border-b-1 !border-opacity-30 hover:!border-opacity-100 border-neutral-500 hover:border-truegray-600 dark:border-neutral-500 hover:dark:border-truegray-400 transition-all duration-200 decoration-none',
      'container-link': 'p-2 opacity-60 hover:opacity-100 cursor-pointer hover:bg-truegray-500 !bg-opacity-10 transition-all duration-200 rounded-lg min-h-11 min-w-11 flex items-center justify-center',
      'button-primary': 'px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105',
      'button-secondary': 'px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-all duration-200',
    },
    // Cards and components
    {
      'card-base': 'p-4 sm:p-6 rounded-lg border border-main bg-white dark:bg-gray-900',
      'card-hover': 'hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-out',
      'post-card': 'block p-4 -mx-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200',
    },
    // Hero section styles
    {
      'hero-section': 'py-16 sm:py-20 lg:py-24',
      'hero-gradient': 'bg-blue-50/30 dark:bg-blue-950/10',
      'hero-title': 'text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight',
      'hero-subtitle': 'text-xl sm:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed',
      'hero-avatar': 'w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full object-cover shadow-2xl',
      'hero-avatar-container': 'relative',
      'hero-avatar-ring': 'absolute inset-0 rounded-full bg-blue-400/20 animate-pulse',
      'social-link-hero': 'p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 hover:scale-110 transition-all duration-300 flex items-center justify-center min-w-12 min-h-12',
    },
    // Post cards modern design
    {
      'post-card-modern': 'bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]',
      'post-card-content': 'p-6 flex flex-col',
      'post-card-title': 'text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-tight mb-2',
      'post-card-description': 'text-gray-600 dark:text-gray-400 leading-relaxed',
      'post-card-date': 'text-gray-500 dark:text-gray-500 font-medium',
      'post-card-icon': 'text-gray-400 dark:text-gray-600',
      'post-tag': 'px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium',
      'post-grid': 'grid gap-6 sm:gap-8 grid-cols-1',
      'post-grid-item': 'animate-fade-in-up',
    },
    // Utilities
    {
      'hr-line': 'w-14 mx-auto my-8 border-solid border-1px !border-truegray-200 !dark:border-truegray-800',
      'focus-ring': 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
      'touch-target': 'min-h-11 min-w-11 flex items-center justify-center',
    },
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      prefix: 'i-',
      extraProperties: {
        display: 'inline-block',
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,600,800',
        mono: 'DM Mono:400,600',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: [
    'i-ri-file-list-2-line',
    'i-carbon-campsite',
    'i-carbon-rocket',
    'i-simple-icons-github',
    'i-simple-icons-x',
    'i-simple-icons-linkedin',
    'i-simple-icons-instagram',
    'i-simple-icons-youtube',
    'i-simple-icons-bilibili',
    'i-simple-icons-zhihu',
    'i-simple-icons-sinaweibo',
    'i-ri-github-line',
    'i-ri-twitter-x-line',
    'i-ri-rss-line',
    'i-ri-menu-2-fill',
    'i-ri-sun-line',
    'i-ri-moon-line',
    'i-ri-code-line',
    'i-ri-article-line',
    'i-ri-time-line',
    'i-ri-arrow-right-up-line',
    'i-ri-arrow-right-line',
    'i-ri-close-line',
    'animate-fade-in-up',
    'animate-pulse',
    'bg-blue-50/30',
    'bg-blue-950/10',
    'bg-blue-400/20',
    'hover:scale-105',
    'hover:scale-110',
    'hover:scale-[1.02]',
    'group-hover:translate-x-1',
    'group-hover:-translate-y-1',
  ],
})