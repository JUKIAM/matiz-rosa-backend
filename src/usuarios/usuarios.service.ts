import {
  ConflictException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger('UsuariosService');

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async crearUsuario(createUsuarioDto: CreateUsuarioDto) {
    const { correo } = createUsuarioDto;
    const usuarioExistente = await this.obtenerPorCorreo(correo);

    if (usuarioExistente) {
      throw new ConflictException(
        `El correo electrónico "${correo}" ya está en uso`,
      );
    }

    try {
      return await this.usuarioRepository.save(createUsuarioDto);
    } catch (error) {
      this.manejoDeErrores(error);
    }
  }

  obtenerTodosLosUsuarios() {
    return this.usuarioRepository.find();
  }

  async obtenerUnUsuario(id: number) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return usuario;
  }

  async actualizarUsuario(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.obtenerUnUsuario(id);

    try {
      await this.usuarioRepository.save({
        ...usuario,
        ...updateUsuarioDto,
      });
      return this.obtenerUnUsuario(id);
    } catch (error) {
      this.manejoDeErrores(error);
    }
  }

  async eliminarUsuario(id: number) {
    const usuario = await this.obtenerUnUsuario(id);
    await this.usuarioRepository.remove(usuario);
  }

  async obtenerPorCorreo(correo: string) {
    const usuario = await this.usuarioRepository.findOneBy({ correo });
    return usuario;
  }

  private manejoDeErrores(error: any) {
    this.logger.error(error);

    throw new ConflictException(
      'Ocurrió un error inesperado. Por favor, verifica los registros del servidor.',
    );
  }
}
