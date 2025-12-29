import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";
import { IndividualPerson } from "../entities/IndividualPerson";
import { BusinessPerson } from "../entities/BusinessPerson";
import { hashPassword } from "../utils/HashPassword";
import { CreateUserDTO } from "../dtos/CreateUserDto";
import { UpdateUserDTO } from "../dtos/UpdateUserDto";
import { Repository } from "typeorm";

export class UserService {
  private userRepository: Repository<User>;
  private individualRepository: Repository<IndividualPerson>;
  private businessRepository: Repository<BusinessPerson>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.individualRepository = AppDataSource.getRepository(IndividualPerson);
    this.businessRepository = AppDataSource.getRepository(BusinessPerson);
  }

  async create(data: CreateUserDTO) {
    const userExists = await this.userRepository.findOneBy({
      email: data.email,
    });
    if (userExists) throw new Error("E-mail já cadastrado");

    if (data.type === "individual") {
      if (!data.name || !data.cpf || !data.birthDate) {
        throw new Error("Dados de pessoa física incompletos");
      }
    }

    if (data.type === "business") {
      if (!data.fantasyName || !data.cnpj) {
        throw new Error("Dados de pessoa jurídica incompletos");
      }
    }

    const hashedPassword = await hashPassword(data.password);
    const user = this.userRepository.create({
      email: data.email,
      password: hashedPassword,
      type: data.type,
    });
    await this.userRepository.save(user);

    let createdData
    switch (data.type) {
      case "individual": {
        createdData = this.individualRepository.create({
          name: data.name,
          cpf: data.cpf,
          birth_date: data.birthDate,
          user: user
        });
        await this.individualRepository.save(createdData);
        break;
      }
      case "business": {
        createdData = this.businessRepository.create({
          fantasy_name: data.fantasyName,
          cnpj: data.cnpj,
          company_name: data.companyName,
          job_title: data.jobTitle,
          user: user
        });
        await this.businessRepository.save(createdData);
        break;
      }
    }
    return { user, profile: createdData };
  }

  async update(id: number, data: UpdateUserDTO) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['individual', 'business'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, {
      email: data.email ?? user.email
    })
  }
  async findAll() {
  return this.userRepository.find({
    relations: ['individual', 'business'],
  });
  }

  async delete(id: number) {
  const user = await this.userRepository.findOne({
    where: { id },
    relations: ['individual', 'business'], 
  });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (user.individual) {
      await this.individualRepository.remove(user.individual);
    } else if (user.business) {
      await this.businessRepository.remove(user.business);
    }

    await this.userRepository.remove(user);
  }

}
