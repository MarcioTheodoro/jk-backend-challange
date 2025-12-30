// src/database/seed/createUsersSeed.ts
import { AppDataSource } from "../data-source";
import { User } from "../../entities/User";
import { hashPassword } from "../../utils/HashPassword";

export const createUsersSeed = async () => {
  const userRepo = AppDataSource.getRepository(User);

  const hashed = await hashPassword("123456");
  const user = userRepo.create({
    email: "admin@admin.com",
    password: hashed,
    type: "individual",
  });
  await userRepo.save(user);
};

createUsersSeed().then(() => console.log("Seed concluída!"));
