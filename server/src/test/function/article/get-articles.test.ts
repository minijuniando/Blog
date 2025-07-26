import { describe, it, expect, vi } from 'vitest';
import { getArticles } from '../../../function/article/get-articles';
import { db } from '../../../db/client';

vi.mock('../../../db/client', () => ({
  db: {
    article: {
      findMany: vi.fn(),
    },
  },
}));

describe('getArticles', () => {
  it('should return a list of articles', async () => {
    const articles = [
      { id: 'article-1', title: 'Article 1', content: 'Content 1', userId: 'user-1', photoUrl: 'url1', tags: [] },
      { id: 'article-2', title: 'Article 2', content: 'Content 2', userId: 'user-2', photoUrl: 'url2', tags: [] },
    ];
    vi.mocked(db.article.findMany).mockResolvedValue(articles);

    const result = await getArticles();

    expect(result).toEqual(articles);
  });
});
