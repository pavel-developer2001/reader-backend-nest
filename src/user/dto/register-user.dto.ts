import { IsEmail, Length } from 'class-validator';

export class RegisterUserDto {
  @Length(3)
  name: string;

  @IsEmail(undefined, { message: 'Неверная почта' })
  email: string;

  @Length(6, 32, { message: 'Пароль должен минимум 6 символов' })
  password: string;
}
