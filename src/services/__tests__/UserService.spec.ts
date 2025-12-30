import { UserService } from '../UserService';
import { User } from '../../entities/User';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../database/data-source';

jest.mock('../../database/data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('UserService', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<Repository<User>>;

  beforeEach(() => {
    userRepository = {
      findOne: jest.fn(),
      findBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    } as any;

    (AppDataSource.getRepository as jest.Mock).mockReturnValue(userRepository);
    userService = new UserService();
  });

  it('deve retornar lista de usuários', async () => {
    userRepository.findBy.mockResolvedValue([
      { id: 1, email: 'test@test.com' } as User,
    ]);

    const result = await userService.findAll();

    expect(result).toHaveLength(1);
    expect(userRepository.findBy).toHaveBeenCalled();
  });

  it('deve lançar erro ao atualizar usuário inexistente', async () => {
    userRepository.findBy.mockResolvedValue([]);

    await expect(
      userService.update(99, {} as any)
    ).rejects.toThrow('User not found');
  });

  it('deve salvar usuário atualizado', async () => {
    const user = { id: 1, email: 'old@test.com' } as User;

    userRepository.findBy.mockResolvedValue([user]);
    userRepository.save.mockResolvedValue(user);

    const result = await userService.update(1, { email: 'new@test.com' } as any);

    expect(userRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'new@test.com' })
    );
    expect(result.email).toBe('new@test.com');
  });
});
