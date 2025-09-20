import siteConfig from '@/site-config';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const startYear = siteConfig.footer.since || currentYear;
  const yearDisplay = startYear === currentYear ? currentYear : `${startYear} - ${currentYear}`;

  return (
    <footer className="container-sm py-12 sm:py-16 text-center border-t border-main mt-auto">
      <div className="container-content">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <p className="text-small opacity-60">
            © {yearDisplay} {siteConfig.author.name}
          </p>
          <div className="flex justify-center gap-4">
            {siteConfig.socialLinks.slice(0, 3).map((link) => (
              <a
                key={link.text}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="container-link text-sm"
                aria-label={link.text}
              >
                <span className={link.icon}></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}