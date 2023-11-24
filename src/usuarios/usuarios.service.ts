import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  crearUsuario(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

  obtenerTodosLosUsuarios() {
    return `This action returns all usuarios`;
  }

  obtenerUnUsuario(id: number) {
    return `This action returns a #${id} usuario`;
  }

  actualizarUsuario(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  eliminarUsuario(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
