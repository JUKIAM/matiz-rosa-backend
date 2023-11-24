import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  crearProducto(createProductoDto: CreateProductoDto) {
    return 'This action adds a new producto';
  }

  obtenerTodosLosProductos() {
    return `This action returns all productos`;
  }

  obtenerUnProducto(id: number) {
    return `This action returns a #${id} producto`;
  }

  actualizarProducto(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  eliminarProducto(id: number) {
    return `This action removes a #${id} producto`;
  }
}
