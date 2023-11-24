import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Role } from '../enums/role.enum';

export class RegisterAuthDto {
  @ApiProperty({
    description: 'El correo electrónico del usuario',
    example: 'usuario@matizrosa.com',
  })
  @IsEmail({}, { message: 'El formato del correo electrónico no es válido' })
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
  correo: string;

  @ApiProperty({
    description: 'La contraseña del usuario',
    example: 'admin123',
  })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  contraseña: string;

  @ApiProperty({
    description: 'El rol del usuario',
    example: 'Administrador',
  })
  @IsOptional()
  rol: Role;

  @ApiProperty({
    description: 'Si el usuario está activo',
    example: true,
  })
  @IsBoolean({ message: 'El estado debe ser un valor booleano' })
  @IsOptional()
  estado: boolean;
}
