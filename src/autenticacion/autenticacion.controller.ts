import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from './decorators/auth.decorator';
import { AuthGuard } from './guards/auth.guard';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { IActiveUser } from './interfaces/active-user.interface';
import { ActiveUser } from './decorators/active-user.decorator';
import { Role } from './enums/role.enum';

@ApiTags('Autenticacion')
@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly authService: AutenticacionService) {}

  /**
   * @summary Iniciar sesión de usuario
   * @description Inicia sesión de un usuario.
   * @param loginAuthDto Datos de autenticación del usuario.
   * @returns Respuesta de éxito al iniciar sesión.
   */
  @Post('inicio-sesion')
  @ApiOperation({
    summary: 'Iniciar sesión de usuario',
    description: 'Inicia sesión de un usuario.',
  })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  inicioSesion(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  /**
   * @summary Registrar usuario
   * @description Registra un nuevo usuario.
   * @param registerAuthDto Datos de registro del usuario.
   * @returns Respuesta de éxito al registrar usuario.
   */
  @Post('registro')
  @ApiOperation({
    summary: 'Registrar usuario',
    description: 'Registra un nuevo usuario.',
  })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  registro(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.registrar(registerAuthDto);
  }

  /**
   * @summary Perfil de usuario
   * @description Obtiene la información del perfil del usuario.
   * @param user Usuario activo autenticado.
   * @returns Perfil del usuario recuperado exitosamente.
   */
  @Get('perfil')
  @Auth(Role.Comprador)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Perfil de usuario',
    description: 'Obtiene la información del perfil del usuario.',
  })
  @ApiResponse({
    status: 200,
    description: 'Perfil de usuario recuperado exitosamente',
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  perfil(@ActiveUser() user: IActiveUser) {
    return this.authService.perfil(user);
  }
}
