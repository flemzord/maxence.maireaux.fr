import type { Locale } from '@/i18n'
import type { ProjectData } from '@/types'

export const localizedProjectData: Record<Locale, ProjectData> = {
  en: [
    {
      title: 'Current Projects',
      projects: [
        {
          text: 'Sweady',
          description: 'Sweady integrates GitHub & Slack with contextual workflows to clear code review bottlenecks, reduce notification noise, and automate assignments and reminders.',
          icon: 'i-carbon-rocket',
          href: 'https://sweady.co',
        },
        {
          text: 'GitHub Compliance',
          description: 'A CLI tool to monitor and enforce compliance across your GitHub organizations. Verify security settings, branch protections, and team configurations.',
          icon: 'i-carbon-security',
          href: 'https://github.com/flemzord/github-compliance',
        },
      ],
    },
    {
      title: 'Project Sold',
      projects: [
        {
          text: 'MyTeslaMate',
          description: 'TeslaMate is a personal data logger for your Tesla. It captures every charge, drive, update, and wraps it all into insightful dashboards and statistics.',
          icon: 'i-carbon-campsite',
          href: 'https://www.myteslamate.com/',
        },
      ],
    },
  ],
  fr: [
    {
      title: 'Projets en cours',
      projects: [
        {
          text: 'Sweady',
          description: "Sweady connecte GitHub et Slack avec des workflows contextuels pour supprimer les goulots d'étranglement des revues de code, réduire le bruit des notifications et automatiser les relances.",
          icon: 'i-carbon-rocket',
          href: 'https://sweady.co',
        },
        {
          text: 'GitHub Compliance',
          description: "Un outil CLI pour surveiller et appliquer la conformité dans vos organisations GitHub. Vérifiez les paramètres de sécurité, protections de branches et configurations d'équipe.",
          icon: 'i-carbon-security',
          href: 'https://github.com/flemzord/github-compliance',
        },
      ],
    },
    {
      title: 'Projets cédés',
      projects: [
        {
          text: 'MyTeslaMate',
          description: 'TeslaMate est un journal de bord pour votre Tesla. Il enregistre chaque charge, trajet et mise à jour, puis synthétise le tout dans des tableaux de bord et statistiques clairs.',
          icon: 'i-carbon-campsite',
          href: 'https://www.myteslamate.com/',
        },
      ],
    },
  ],
}
