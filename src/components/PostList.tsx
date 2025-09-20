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
  <article className="post-card-modern group">
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="block h-full focus-ring rounded-xl"
    >
      <div className="post-card-content h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {post.tag && (
              <span className="post-tag mb-3 inline-block">
                {post.tag}
              </span>
            )}
            <h3 className="post-card-title group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {post.title}
            </h3>
          </div>
          <div className="post-card-icon ml-4 flex-shrink-0">
            <span className="i-ri-arrow-right-up-line text-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1"></span>
          </div>
        </div>
        
        {post.description && (
          <p className="post-card-description mb-6 line-clamp-2">{post.description}</p>
        )}
        
        <div className="mt-auto">
          <div className="flex items-center gap-4 text-sm">
            <time dateTime={post.date} className="post-card-date">
              {formatPostDate(post.date, locale)}
            </time>
            <div className="flex items-center gap-1 opacity-60">
              <span className="i-ri-time-line text-xs"></span>
              <span>5 min</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </article>
));

PostItem.displayName = 'PostItem';

const PostList = memo(({ posts, locale }: PostListProps) => {
  return (
    <div className="post-grid">
      {posts.map((post, index) => (
        <div key={post.slug} className="post-grid-item" style={{ animationDelay: `${index * 100}ms` }}>
          <PostItem post={post} locale={locale} />
        </div>
      ))}
    </div>
  );
});

PostList.displayName = 'PostList';

export default PostList;