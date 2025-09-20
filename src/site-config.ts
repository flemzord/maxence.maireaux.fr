interface SocialLink {
  text: string
  href: string
  icon: string
  header?: string | boolean
}

interface Site {
  author: {
    name: string
    email: string
    link: string
  }
  url: string
  title: string
  description: {
    fr: string
    en: string
  }
  keywords: string[]
  socialLinks: SocialLink[]
  header: {
    logo: {
      src: string
      alt: string
    }
  }
  footer: {
    since: number
  }
}

const siteConfig: Site = {
  author: {
    name: 'Maxence Maireaux',
    email: 'maxence@maireaux.fr',
    link: 'https://maxence.maireaux.fr',
  },
  url: 'https://maxence.maireaux.fr',
  title: 'Maxence Maireaux',
  description: {
    fr: "VP Engineering le jour, Indie Hacker la nuit. J'explore la tech, le produit et la culture engineering.",
    en: 'VP of Engineering by day, Indie Hacker by night. I write about engineering leadership, tooling, and building products.',
  },
  keywords: ['Blog', 'Maxence Maireaux', 'Engineering', 'Tech', 'Product', 'Indie Hacker'],
  socialLinks: [
    {
      text: 'GitHub',
      href: 'https://github.com/flemzord',
      icon: 'i-simple-icons-github',
      header: 'i-ri-github-line',
    },
    {
      text: 'Twitter',
      href: 'https://x.com/flemzord',
      icon: 'i-simple-icons-x',
      header: 'i-ri-twitter-x-line',
    },
    {
      text: 'LinkedIn',
      href: 'https://www.linkedin.com/in/maxencemaireaux/',
      icon: 'i-simple-icons-linkedin',
    },
  ],
  header: {
    logo: {
      src: '/maxence.jpg',
      alt: 'Maxence Maireaux',
    },
  },
  footer: {
    since: 2016,
  },
}

export default siteConfig