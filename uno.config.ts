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
    // Base theme colors
    {
      'bg-main': 'bg-hex-eef5fc dark:bg-hex-0d1117',
      'text-main': 'text-hex-555555 dark:text-hex-bbbbbb',
      'text-link': 'text-dark dark:text-white',
      'border-main': 'border-truegray-300 dark:border-truegray-600',
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
      'button-primary': 'px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium',
    },
    // Cards and components
    {
      'card-base': 'p-4 sm:p-6 rounded-lg border border-main bg-white dark:bg-gray-900',
      'card-hover': 'hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-out',
      'post-card': 'block p-4 -mx-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-200',
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
  ],
})