import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  crearUsuario(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.crearUsuario(createUsuarioDto);
  }

  @Get()
  obtenerTodosLosUsuarios() {
    return this.usuariosService.obtenerTodosLosUsuarios();
  }

  @Get(':id')
  obtenerUnUsuario(@Param('id') id: string) {
    return this.usuariosService.obtenerUnUsuario(+id);
  }

  @Patch(':id')
  actualizarUsuario(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.actualizarUsuario(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.eliminarUsuario(+id);
  }
}
