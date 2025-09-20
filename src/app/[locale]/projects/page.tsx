import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n';
import { localizedProjectData } from '@/data/projects';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';
  return {
    title: isEn ? 'Projects - Maxence Maireaux' : 'Projets - Maxence Maireaux',
    description: isEn
      ? 'A selection of projects I am proud of.'
      : 'Les projets dont je suis le plus fier.',
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('projects');
  const projects = localizedProjectData[locale];

  return (
    <>
      <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
      <p className="text-lg opacity-70 mb-8">{t('description')}</p>

      <div className="space-y-12">
        {projects.map((section) => (
          <section key={section.title}>
            <h2 className="text-2xl font-semibold mb-6">{section.title}</h2>
            <div className="grid gap-4">
              {section.projects.map((project) => (
                <a
                  key={project.text}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 rounded-lg border border-main hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className={`text-2xl ${project.icon}`}></span>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{project.text}</h3>
                      <p className="opacity-70">{project.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}