import Link from 'next/link';
import { memo } from 'react';
import { Locale } from '@/i18n';
import { formatPostDate } from '@/lib/date';
import { Post } from '@/types';

interface PostListProps {
  posts: Post[];
  locale: Locale;
}

const PostItem = memo(({ post, locale }: { post: Post; locale: Locale }) => (
  <article className="group">
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="block p-4 -mx-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
    >
      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
        {post.title}
      </h3>
      {post.description && (
        <p className="text-sm opacity-70 mb-2">{post.description}</p>
      )}
      <div className="flex items-center gap-4 text-sm opacity-60">
        <time dateTime={post.date}>
          {formatPostDate(post.date, locale)}
        </time>
        {post.tag && (
          <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">
            {post.tag}
          </span>
        )}
      </div>
    </Link>
  </article>
));

PostItem.displayName = 'PostItem';

const PostList = memo(({ posts, locale }: PostListProps) => {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} locale={locale} />
      ))}
    </div>
  );
});

PostList.displayName = 'PostList';

export default PostList;