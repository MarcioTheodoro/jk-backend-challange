import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  private authService = new AuthService();

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const token = await this.authService.login(email, password);
      return res.json(token);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  async logout(req: Request, res: Response) {
    return res.status(204).send();
  }
}
