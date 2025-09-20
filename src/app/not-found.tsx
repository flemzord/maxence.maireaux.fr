import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-main">
      <div className="text-center px-6 py-12">
        <h1 className="text-6xl font-bold text-main mb-4">404</h1>
        <h2 className="text-2xl mb-6 text-main">Page not found</h2>
        <p className="text-lg mb-8 text-main/80">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-text-main text-bg-main rounded-lg transition hover:opacity-80"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}