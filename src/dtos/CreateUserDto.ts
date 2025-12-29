export class CreateUserDTO {
  email: string;
  password: string;
  type: 'individual' | 'business';

  name?: string;
  cpf?: string;
  birthDate?: Date;

  fantasyName?: string;
  companyName?: string;
  cnpj?: string;
  jobTitle?: string;
}
