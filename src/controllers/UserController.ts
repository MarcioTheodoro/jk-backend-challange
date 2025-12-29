import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CreateUserDTO } from "../dtos/CreateUserDto";
import { UpdateUserDTO } from "../dtos/UpdateUserDto";

export class UserController {
  private userService = new UserService();

  /**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               type:
 *                 type: string
 *               name:
 *                 type: string
 *               cpf:
 *                 type: string
 *               birthDate:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - type
 *               - name
 *               - cpf
 *               - birthDate
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */


  async create(req: Request, res: Response) {
    const createUserDto = plainToInstance(CreateUserDTO, req.body);
    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      // Mapeia os erros para ficar mais limpo para o front-end
      const formattedErrors = errors.map(error => ({
        property: error.property,
        constraints: error.constraints
      }));
      return res.status(400).json({ errors: formattedErrors });
    }

    try {
      const user = await this.userService.create(createUserDto);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const updateUserDto = plainToInstance(UpdateUserDTO, req.body);
    const errors = await validate(updateUserDto);
    if (errors.length > 0) {
      const formattedErrors = errors.map(error => ({
        property: error.property,
        constraints: error.constraints
      }));
      return res.status(400).json({ errors: formattedErrors });
    }
    try {
      const user = await this.userService.update(Number(id), updateUserDto);
      return res.json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const users = await this.userService.findAll();
      return res.json(users);
    } catch (error: any) {
      return res.status(500).json({ message: "Erro ao listar usuários" });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await this.userService.delete(Number(id));
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
