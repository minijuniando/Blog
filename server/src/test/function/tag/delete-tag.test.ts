import { describe, it, expect, vi } from 'vitest';
import { deleteTag } from '../../../function/tag/delete-tag';
import { db } from '../../../db/client';

vi.mock('../../../db/client', () => ({
  db: {
    tag: {
      delete: vi.fn(),
    },
  },
}));

describe('deleteTag', () => {
  it('should delete a tag successfully', async () => {
    // Mock the first delete call to simulate a successful deletion
    vi.mocked(db.tag.delete).mockResolvedValueOnce({ id: 'tag-1', name: 'Test Tag' });
    // Mock the second delete call inside the function
    vi.mocked(db.tag.delete).mockResolvedValueOnce({ id: 'tag-1', name: 'Test Tag' });

    const result = await deleteTag('tag-1');

    expect(result).toBe(true);
  });

  it('should return an error if the tag does not exist', async () => {
    vi.mocked(db.tag.delete).mockResolvedValue(null);

    const result = await deleteTag('non-existent-tag');

    expect(result).toEqual({
      error: true,
      status: 400,
      message: 'Essa tag não existe',
    });
  });
});
