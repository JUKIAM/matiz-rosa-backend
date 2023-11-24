import {
  BadRequestException,
  Body,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AutenticacionService {
  constructor(
    private readonly usersService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async login({ correo, contraseña }: LoginAuthDto) {
    const existingUser = await this.usersService.obtenerPorCorreo(correo);

    if (!existingUser) {
      throw new BadRequestException(
        `El correo electrónico '${correo}' no está registrado`,
      );
    }
    
    const payload = {
      sub: existingUser.id,
      correo: existingUser.correo,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      correo: correo,
    };
  }

  async registrar(@Body() registerAuthDto: RegisterAuthDto) {
    const existingUser = await this.usersService.obtenerPorCorreo(
      registerAuthDto.correo,
    );

    if (existingUser) {
      throw new BadRequestException(
        `El usuario con el correo '${registerAuthDto.correo}' ya existe.`,
      );
    }

    if (!registerAuthDto.estado) {
      throw new BadRequestException(
        `El usuario con el correo electrónico '${registerAuthDto.correo}' no está activo.`,
      );
    }
    
    return await this.usersService.crearUsuario(registerAuthDto);
  }

  async perfil({ correo: correo }: { correo: string }) {
    return await this.usersService.obtenerPorCorreo(correo);
  }
}
