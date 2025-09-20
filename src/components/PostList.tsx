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
  <article>
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="group post-card card-hover focus-ring block"
    >
      <h3 className="text-title mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
        {post.title}
      </h3>
      {post.description && (
        <p className="text-body opacity-70 mb-4 line-clamp-2">{post.description}</p>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-small opacity-60">
        <time dateTime={post.date} className="font-medium">
          {formatPostDate(post.date, locale)}
        </time>
        {post.tag && (
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium w-fit">
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
    <div className="grid gap-6 sm:gap-8">
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} locale={locale} />
      ))}
    </div>
  );
});

PostList.displayName = 'PostList';

export default PostList;