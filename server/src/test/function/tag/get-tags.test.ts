import { describe, it, expect, vi } from 'vitest';
import { getTags } from '../../../function/tag/get-tags';
import { db } from '../../../db/client';

vi.mock('../../../db/client', () => ({
  db: {
    tag: {
      findMany: vi.fn(),
    },
  },
}));

describe('getTags', () => {
  it('should return a list of tags', async () => {
    const tags = [
      { id: 'tag-1', name: 'Tag 1' },
      { id: 'tag-2', name: 'Tag 2' },
    ];
    vi.mocked(db.tag.findMany).mockResolvedValue(tags);

    const result = await getTags();

    expect(result).toEqual(tags);
  });

  it('should return an error if there is a database issue', async () => {
    vi.mocked(db.tag.findMany).mockRejectedValue(new Error('DB Error'));

    const result = await getTags();

    expect(result).toEqual({
      error: true,
      status: 500,
      message: 'Error: DB Error',
    });
  });
});
