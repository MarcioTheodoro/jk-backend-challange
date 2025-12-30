import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();
const controller = new AuthController();

/**
 * @swagger
 * /users/auth/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Auth]
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
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", (req, res) => controller.login(req, res));

/**
 * @swagger
 * /users/auth/logout:
 *   delete:
 *     summary: Logout do usuário
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 */
router.delete("/logout", authMiddleware, (req, res) => controller.logout(req, res));

export default router;
