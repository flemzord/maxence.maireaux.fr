export interface Post {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tag?: string;
  lang: string;
  translationKey?: string;
  content: string;
}

export interface MDXComponents {
  a?: React.ComponentType<React.AnchorHTMLAttributes<HTMLAnchorElement>>;
  pre?: React.ComponentType<React.HTMLAttributes<HTMLPreElement>>;
  code?: React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  [key: string]: React.ComponentType<any> | undefined;
}

export interface NavigationLink {
  id: string;
  text: string;
  href: string;
}

export interface SocialLink {
  text: string;
  href: string;
  icon: string;
  header?: boolean | string;
}

export type ProjectData = Array<{
  title: string
  projects: Array<{
    text: string
    description?: string
    icon?: string
    href: string
  }>
}>