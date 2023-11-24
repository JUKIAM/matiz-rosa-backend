import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Usuario } from './entities/usuario.entity';
import { Auth } from 'src/autenticacion/decorators/auth.decorator';
import { UsuariosService } from './usuarios.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Role } from 'src/autenticacion/enums/role.enum';

@Auth(Role.Administrador)
@ApiBearerAuth()
@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  /**
   * @summary Obtener todos los usuarios
   * @description Recupera una lista de todos los usuarios.
   * @returns Lista de usuarios recuperada exitosamente.
   */
  @Get()
  @ApiOperation({
    summary: 'Obtener todos los usuarios',
    description: 'Recupera una lista de todos los usuarios.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios recuperada exitosamente.',
    type: Usuario,
    isArray: true,
  })
  findAll() {
    return this.usuariosService.obtenerTodosLosUsuarios();
  }

  /**
   * @summary Buscar un usuario por término
   * @description Recupera un usuario por término (nombre de usuario, correo electrónico o ID).
   * @param term Término de búsqueda (correo electrónico o ID del usuario).
   * @returns Usuario recuperado exitosamente.
   */
  @Get(':term')
  @ApiOperation({
    summary: 'Buscar un usuario por término',
    description:
      'Recupera un usuario por término (nombre de usuario, correo electrónico o ID).',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario recuperado exitosamente.',
    type: Usuario,
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiParam({
    name: 'term',
    description: 'Correo electrónico o ID del usuario',
  })
  findOne(@Param('term') term: number) {
    return this.usuariosService.obtenerUnUsuario(term);
  }

  /**
   * @summary Actualizar un usuario por ID
   * @description Actualiza un usuario por ID.
   * @param id ID del usuario a actualizar.
   * @param updatePersonDto Datos actualizados del usuario.
   * @returns El usuario ha sido actualizado exitosamente.
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiResponse({
    status: 200,
    description: 'El usuario ha sido actualizado exitosamente.',
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  update(@Param('id') id: number, @Body() updatePersonDto: UpdateUsuarioDto) {
    return this.usuariosService.actualizarUsuario(id, updatePersonDto);
  }

  /**
   * @summary Eliminar un usuario por ID
   * @description Elimina un usuario por ID.
   * @param id ID del usuario a eliminar.
   * @returns El usuario ha sido eliminado exitosamente.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiResponse({
    status: 204,
    description: 'El usuario ha sido eliminado exitosamente.',
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  remove(@Param('id') id: number) {
    return this.usuariosService.eliminarUsuario(id);
  }
}
