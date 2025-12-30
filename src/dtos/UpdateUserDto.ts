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


  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsString()
  birthDate?: string;


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
  