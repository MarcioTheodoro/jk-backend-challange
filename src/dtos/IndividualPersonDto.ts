import {
  IsEmail, IsEnum, IsNotEmpty, IsString, MinLength, MaxLength, IsOptional, Length,
  minLength,
  IsDateString,
  IsPositive
} from 'class-validator';

export class CreateIndividualPersonDTO {
  @IsNotEmpty({ message: "O campo de nome é obrigatório" })
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty({ message: "O campo de CPF é obrigatório" })
  @Length(14, 14, { message: "O CPF deve ter exatamente 14 caracteres" })
  cpf: string;

  @IsNotEmpty({ message: "O campo de Data de Nascimento é obrigatório" })
  @IsDateString({}, { message: 'Data de nascimento inválida' })
  birth_date: string;
}
