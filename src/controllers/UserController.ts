import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { CreateUserDTO } from '../dtos/CreateUserDto';

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Retorna uma lista de usuários
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - type
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: example@gmail.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *               type:
 *                 type: string
 *                 enum:
 *                   - Individual Person
 *                   - Business Person
 *                 example: Individual Person
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro na validação
 */

export class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  async create(req: Request, res: Response) {
    try {
      const data: CreateUserDTO = req.body;
      const result = await this.userService.create(data);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
