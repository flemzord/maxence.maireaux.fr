import { redirect } from 'next/navigation';

export default function RootPage() {
  // This page will never be reached in static export because of the client-side redirect
  // But we need it for the build process
  redirect('/fr');
}