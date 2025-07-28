import { describe, it, expect, vi } from 'vitest';
import { getUserArticles } from '../../../function/article/get-user-articles';
import { db } from '../../../db/client';

vi.mock('../../../db/client', () => ({
  db: {
    user: {
      findUnique: vi.fn(),
    },
    article: {
      findMany: vi.fn(),
    },
  },
}));

describe('getUserArticles', () => {
  it('should return articles for a valid user', async () => {
    vi.mocked(db.user.findUnique).mockResolvedValue({ id: 'user-1', name: 'Test User' });
    const articles = [
      { id: 'article-1', title: 'Article 1', content: 'Content 1', userId: 'user-1', photoUrl: 'url1', tags: [] },
    ];
    vi.mocked(db.article.findMany).mockResolvedValue(articles);

    const result = await getUserArticles('user-1');

    expect(result).toEqual(articles);
  });

  it('should return an error if the user does not exist', async () => {
    vi.mocked(db.user.findUnique).mockResolvedValue(null);

    const result = await getUserArticles('non-existent-user');

    expect(result).toEqual({
      error: true,
      status: 404,
      message: 'O usuário com id: non-existent-user não existe',
    });
  });
});
