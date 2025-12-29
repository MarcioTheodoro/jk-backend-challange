import {
  IsEmail, 
  IsEnum, 
  IsNotEmpty, 
  MinLength, 
  MaxLength
} from 'class-validator';

export class UserDTO {
  @IsNotEmpty({ message: "Email is required." })
  @IsEmail({}, { message: "Formato do e-mail inválido" })
  @MaxLength(100)
  email: string;

  @IsNotEmpty({ message: "O campo de senha é obrigatório" })
  @MinLength(8, { message: "A senha deve ter no mínimo 8 caracteres" })
  @MaxLength(255)
  password: string;

  @IsEnum(['individual', 'business'], { message: "O tipo deve ser pessoa física ou pessoa jurídica" })
  type: 'individual' | 'business';
}
