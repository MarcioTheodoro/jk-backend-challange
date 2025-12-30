import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

export class CreateUserDTO {
  @IsEmail()
  email!: string;

  @IsString()
  @Length(6, 255)
  password!: string;

  @IsEnum(["individual", "business"])
  type!: "individual" | "business";

  
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
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
