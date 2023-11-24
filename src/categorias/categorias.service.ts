import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  crearCategoria(createCategoriaDto: CreateCategoriaDto) {
    return 'This action adds a new categoria';
  }

  obtenerTodasLasCategorias() {
    return `This action returns all categorias`;
  }

  obtenerUnaCategoria(id: number) {
    return `This action returns a #${id} categoria`;
  }

  actualizarCategoria(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`;
  }

  eliminarCategoria(id: number) {
    return `This action removes a #${id} categoria`;
  }
}
