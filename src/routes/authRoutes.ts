import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();
const controller = new AuthController();

router.post("/login", (req, res) => controller.login(req, res));
router.delete("/logout", (req, res) => controller.logout(req, res));

export default router;
