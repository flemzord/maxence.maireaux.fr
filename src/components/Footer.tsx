import siteConfig from '@/site-config';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const startYear = siteConfig.footer.since || currentYear;
  const yearDisplay = startYear === currentYear ? currentYear : `${startYear} - ${currentYear}`;

  return (
    <footer className="px-6 py-12 text-center opacity-60">
      <div className="max-w-4xl mx-auto">
        <p>
          © {yearDisplay} {siteConfig.author.name}
        </p>
      </div>
    </footer>
  );
}