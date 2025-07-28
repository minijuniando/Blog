import { describe, it, expect, vi } from 'vitest';
import { createLike } from '../../../function/like/create-like';
import { db } from '../../../db/client';

vi.mock('../../../db/client', () => ({
  db: {
    user: {
      findUnique: vi.fn(),
    },
    article: {
      findUnique: vi.fn(),
    },
    like: {
      create: vi.fn(),
    },
  },
}));

describe('createLike', () => {
  it('should create a like successfully', async () => {
    vi.mocked(db.user.findUnique).mockResolvedValue({ id: 'user-1' });
    vi.mocked(db.article.findUnique).mockResolvedValue({ id: 'article-1' });
    vi.mocked(db.like.create).mockResolvedValue({ id: 'like-1', userId: 'user-1', articleId: 'article-1' });

    const result = await createLike({ userId: 'user-1', articleId: 'article-1' });

    expect(result).toHaveProperty('id', 'like-1');
  });

  it('should return an error if user is not found', async () => {
    vi.mocked(db.user.findUnique).mockResolvedValue(null);

    const result = await createLike({ userId: 'non-existent-user', articleId: 'article-1' });

    expect(result).toEqual({
      error: true,
      status: 404,
      message: 'Usuário com id: non-existent-user não foi encontrado',
    });
  });

  it('should return an error if article is not found', async () => {
    vi.mocked(db.user.findUnique).mockResolvedValue({ id: 'user-1' });
    vi.mocked(db.article.findUnique).mockResolvedValue(null);

    const result = await createLike({ userId: 'user-1', articleId: 'non-existent-article' });

    expect(result).toEqual({
      error: true,
      status: 404,
      message: 'Artigo com id: non-existent-article não foi encontrado',
    });
  });
});
