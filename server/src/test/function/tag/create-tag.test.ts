import { describe, it, expect, vi } from 'vitest';
import { createTag } from '../../../function/tag/create-tag';
import { db } from '../../../db/client';

vi.mock('../../../db/client', () => ({
  db: {
    tag: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

describe('createTag', () => {
  it('should create a tag successfully', async () => {
    vi.mocked(db.tag.findUnique).mockResolvedValue(null);
    vi.mocked(db.tag.create).mockResolvedValue({ id: 'tag-1', name: 'New Tag' });

    const result = await createTag('New Tag');

    expect(result).toEqual({ id: 'tag-1', name: 'New Tag' });
  });

  it('should return an error if the tag already exists', async () => {
    vi.mocked(db.tag.findUnique).mockResolvedValue({ id: 'tag-1', name: 'Existing Tag' });

    const result = await createTag('Existing Tag');

    expect(result).toEqual({
      error: true,
      status: 400,
      message: 'Essa tag já existe',
    });
  });
});
