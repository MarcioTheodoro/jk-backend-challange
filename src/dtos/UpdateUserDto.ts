import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

export class UpdateUserDTO {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(6, 255)
  password?: string;

  @IsOptional()
  @IsEnum(["individual", "business"])
  type?: "individual" | "business";

  // Pessoa Física
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsString()
  birthDate?: string;

  // Pessoa Jurídica
  @IsOptional()
  @IsString()
  fantasyName?: string;

  @IsOptional()
  @IsString()
  cnpj?: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  jobTitle?: string;
}
  