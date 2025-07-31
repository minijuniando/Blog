import { describe, it, expect, vi } from 'vitest';
import { changeUserRole } from '../../../function/user/change-user-role';
import { db } from '../../../db/client';

vi.mock('../../../db/client', () => ({
  db: {
    user: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

describe('changeUserRole', () => {
  it('should change the user role successfully', async () => {
    vi.mocked(db.user.findUnique)
      .mockResolvedValueOnce({ role: 'ADMIN' }) // Admin check
      .mockResolvedValueOnce({ id: 'target-user-id' }); // Target user
    vi.mocked(db.user.update).mockResolvedValue({ id: 'target-user-id', role: 'WRITER' });

    const result = await changeUserRole('admin-id', 'target-user-id', 'WRITER');

    expect(result).toHaveProperty('role', 'WRITER');
  });

  it('should return an error if the user is not an ADMIN', async () => {
    vi.mocked(db.user.findUnique).mockResolvedValue({ role: 'READER' });

    const result = await changeUserRole('non-admin-id', 'target-user-id', 'WRITER');

    expect(result).toEqual({
      error: true,
      status: 401,
      message: "O usuário deve ser 'ADMIN' para alterar o cargo de alguém",
    });
  });

  it('should return an error if the role is invalid', async () => {
    vi.mocked(db.user.findUnique).mockResolvedValue({ role: 'ADMIN' });

    const result = await changeUserRole('admin-id', 'target-user-id', 'INVALID_ROLE');

    expect(result).toEqual({
      error: true,
      status: 400,
      message: 'A função: INVALID_ROLE não existe.',
    });
  });

  it('should return an error if the target user does not exist', async () => {
    vi.mocked(db.user.findUnique)
      .mockResolvedValueOnce({ role: 'ADMIN' })
      .mockResolvedValueOnce(null);

    const result = await changeUserRole('admin-id', 'non-existent-user', 'WRITER');

    expect(result).toEqual({
      error: true,
      status: 400,
      message: 'O usuário que você deseja alterar o cargo não existe',
    });
  });
});
