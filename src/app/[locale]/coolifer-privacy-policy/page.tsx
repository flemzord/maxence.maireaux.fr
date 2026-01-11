import { setRequestLocale } from 'next-intl/server';
import { Locale, locales } from '@/i18n';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata() {
  return {
    title: 'Privacy Policy - Coolifer',
    description: 'Privacy Policy for Coolifer mobile application.',
  };
}

export default async function CooliferPrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <h1>Privacy Policy - Coolifer</h1>

      <p className="text-sm opacity-70">Last updated: January 2025</p>

      <h2>Overview</h2>
      <p>
        Coolifer is a mobile client that connects to your self-hosted Coolify
        server. We are committed to protecting your privacy.
      </p>

      <h2>Data Collection</h2>
      <p>
        We do not collect any personal data. All data stays between your device
        and your own Coolify server.
      </p>

      <h2>Data Stored on Your Device</h2>
      <ul>
        <li>
          <strong>API Token:</strong> Stored securely using your device&apos;s
          secure storage (iOS Keychain / Android Keystore)
        </li>
        <li>
          <strong>Server URL:</strong> The address of your Coolify instance
        </li>
      </ul>

      <h2>Data Transmission</h2>
      <p>
        All communications occur directly between your device and your
        self-hosted Coolify server. No data is sent to us or any third party.
      </p>

      <h2>Analytics &amp; Tracking</h2>
      <p>We do not use any analytics, tracking, or advertising services.</p>

      <h2>Third-Party Services</h2>
      <p>
        This app does not integrate with any third-party services. Your data is
        never shared.
      </p>

      <h2>Data Retention</h2>
      <p>
        All data is stored locally on your device. Uninstalling the app removes
        all stored data.
      </p>
    </article>
  );
}
