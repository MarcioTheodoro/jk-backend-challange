import {
  IsNotEmpty, 
  MaxLength, 
  IsOptional, 
  Length,
} from 'class-validator';

export class CreateBusinessPersonDTO {
  @IsNotEmpty({ message: "O campo de nome fantasia é obrigatório" })
  @MaxLength(100)
  fantasy_name: string;

  @IsNotEmpty({ message: "O campo de CNPJ é obrigatório" })
  @Length(18, 18, { message: "O CNPJ deve conter exatamente 18 caracteres" })
  cnpj: string;

  @IsOptional()
  @MaxLength(100)
  company_name?: string;

  @IsOptional()
  @MaxLength(100)
  job_title?: string;
}
