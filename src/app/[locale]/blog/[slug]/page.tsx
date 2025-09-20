import { notFound } from 'next/navigation';
import { Locale } from '@/i18n';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import { setRequestLocale } from 'next-intl/server';
import { formatFullDate } from '@/lib/date';
import { Suspense } from 'react';

export async function generateStaticParams({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const posts = await getAllPosts(locale);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(locale, slug);
  if (!post) return {};

  return {
    title: `${post.title} - Maxence Maireaux`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

const mdxComponents = {
  a: (props: any) => <a {...props} className="prose-link" />,
  pre: (props: any) => (
    <pre
      {...props}
      className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-900 p-4"
    />
  ),
  code: (props: any) => (
    <code
      {...props}
      className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-900"
    />
  ),
};

interface BlogPostPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

function PostContent({ post, locale }: { post: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>; locale: Locale }) {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <header className="mb-8">
        <Link href={`/${locale}/blog`} className="prose-link mb-4 inline-block">
          ← {locale === 'fr' ? 'Retour au blog' : 'Back to blog'}
        </Link>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm opacity-70">
          <time dateTime={post.date}>
            {formatFullDate(post.date, locale)}
          </time>
          {post.tag && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
              {post.tag}
            </span>
          )}
        </div>
      </header>

      <Suspense fallback={<div className="animate-pulse">Loading content...</div>}>
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [rehypeHighlight, rehypeSlug],
            },
          }}
        />
      </Suspense>
    </article>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getPostBySlug(locale, slug);

  if (!post) {
    notFound();
  }

  return <PostContent post={post} locale={locale} />;
}