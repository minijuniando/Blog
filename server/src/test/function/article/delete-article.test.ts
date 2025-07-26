import { describe, it, expect, vi } from 'vitest';
import { deleteArticle } from '../../../function/article/delete-article';
import { db } from '../../../db/client';

vi.mock('../../../db/client', () => ({
  db: {
    article: {
      findUnique: vi.fn(),
      delete: vi.fn(),
    },
    articleTags: {
      deleteMany: vi.fn(),
    },
  },
}));

describe('deleteArticle', () => {
  it('should delete an article successfully', async () => {
    vi.mocked(db.article.findUnique).mockResolvedValue({ id: 'article-1', title: 'Test Article', content: 'Test Content', userId: 'user-1', photoUrl: 'url' });
    vi.mocked(db.articleTags.deleteMany).mockResolvedValue({ count: 1 });
    vi.mocked(db.article.delete).mockResolvedValue({ id: 'article-1' });

    const result = await deleteArticle('article-1');

    expect(result).toBe(true);
  });

  it('should return an error if the article does not exist', async () => {
    vi.mocked(db.article.findUnique).mockResolvedValue(null);

    const result = await deleteArticle('non-existent-article');

    expect(result).toEqual({
      error: true,
      status: 400,
      message: 'Esse artigo não existe',
    });
  });
});
