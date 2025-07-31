import { describe, it, expect, vi } from 'vitest';
import { deleteLike } from '../../../function/like/delete-like';
import { db } from '../../../db/client';

vi.mock('../../../db/client', () => ({
  db: {
    like: {
      findUnique: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe('deleteLike', () => {
  it('should delete a like successfully', async () => {
    vi.mocked(db.like.findUnique).mockResolvedValue({ id: 'like-1' });
    vi.mocked(db.like.delete).mockResolvedValue({ id: 'like-1' });

    const result = await deleteLike('like-1');

    expect(result).toBe(true);
  });

  it('should return an error if the like does not exist', async () => {
    vi.mocked(db.like.findUnique).mockResolvedValue(null);

    const result = await deleteLike('non-existent-like');

    expect(result).toEqual({
      error: true,
      status: 404,
      message: 'Esse artigo não tem like!',
    });
  });
});
