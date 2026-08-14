import { Article } from '@/shared/domain/types/article.type';
import { PaginatedOutput } from '@/shared/domain/types/pagination.type';

export type ArticleFilters = Readonly<{
  searchQuery?: string;
  categoryId?: string;
  publishedOnly?: boolean;
  page?: number;
  limit?: number;
}>;

export type ArticleRepository = Readonly<{
  findById: (id: string) => Promise<Article | null>;
  findBySlug: (slug: string) => Promise<Article | null>;
  save: (article: Article) => Promise<Article>;
  update: (article: Article) => Promise<Article>;
  delete: (id: string) => Promise<void>;
  findMany: (filters: ArticleFilters) => Promise<PaginatedOutput<Article>>;
  incrementViews: (id: string) => Promise<void>;
}>;