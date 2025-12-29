import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();
const controller = new UserController();


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna a lista de todos os usuários com seus perfis associados (individual/business)
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/", authMiddleware, (req, res) => controller.list(req, res));

/**
@swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário (Individual ou Business)
 *     tags:
 *       - Users
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
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 example: SenhaSegura123
 *               type:
 *                 type: string
 *                 enum: [individual, business]
 *                 description: Tipo de perfil (Pessoa Física ou Jurídica)
 *               # Campos Condicionais para 'individual'
 *               name:
 *                 type: string
 *                 example: João da Silva
 *               cpf:
 *                 type: string
 *                 example: 123.456.789-00
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 example: 1990-01-01
 *               # Campos Condicionais para 'business'
 *               fantasyName:
 *                 type: string
 *                 example: Super Vendas Ltda
 *               cnpj:
 *                 type: string
 *                 example: 00.000.000/0001-00
 *               companyName:
 *                 type: string
 *                 example: Razão Social da Empresa
 *               jobTitle:
 *                 type: string
 *                 example: Gerente de Vendas
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro de validação ou e-mail já cadastrado
 */
router.post("/", (req, res) => controller.create(req, res));

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário existente
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: novo.email@exemplo.com
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.put("/:id", authMiddleware, (req, res) => controller.update(req, res));

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário e seu perfil associado
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser deletado
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete("/:id", authMiddleware, (req, res) => controller.delete(req, res));

export default router;
