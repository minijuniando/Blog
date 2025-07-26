import { describe, it, expect, vi } from 'vitest';
import { updateTag } from '../../../function/tag/update-tag';
import { db } from '../../../db/client';

vi.mock('../../../db/client', () => ({
  db: {
    tag: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

describe('updateTag', () => {
  it('should update a tag successfully', async () => {
    vi.mocked(db.tag.findUnique).mockResolvedValueOnce({ id: 'tag-1', name: 'Old Name' }); // For tagById
    vi.mocked(db.tag.findUnique).mockResolvedValueOnce(null); // For tagByName
    vi.mocked(db.tag.update).mockResolvedValue({ id: 'tag-1', name: 'New Name' });

    const result = await updateTag('tag-1', 'New Name');

    expect(result).toEqual({ id: 'tag-1', name: 'New Name' });
  });

  it('should return an error if the tag id does not exist', async () => {
    vi.mocked(db.tag.findUnique).mockResolvedValue(null);

    const result = await updateTag('non-existent-tag', 'New Name');

    expect(result).toEqual({
      error: true,
      status: 400,
      message: 'Tag com esse id não existe',
    });
  });

  it('should return an error if the tag name already exists', async () => {
    vi.mocked(db.tag.findUnique).mockResolvedValueOnce({ id: 'tag-1', name: 'Old Name' }); // For tagById
    vi.mocked(db.tag.findUnique).mockResolvedValueOnce({ id: 'tag-2', name: 'Existing Name' }); // For tagByName

    const result = await updateTag('tag-1', 'Existing Name');

    expect(result).toEqual({
      error: true,
      status: 400,
      message: 'Tag com esse nome não existe',
    });
  });
});
