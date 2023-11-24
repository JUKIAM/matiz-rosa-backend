import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { CategoriasService } from 'src/categorias/categorias.service'; // Ajusta la ruta según la estructura de tu proyecto

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    private readonly categoriasService: CategoriasService,
  ) {}

  async crearProducto(createProductoDto: CreateProductoDto) {
    try {
      // Validar que la categoría existe
      const categoria = await this.categoriasService.obtenerUnaCategoria(
        createProductoDto.categoriaId,
      );

      if (!categoria) {
        throw new NotFoundException(
          `La categoría con ID ${createProductoDto.categoriaId} no existe`,
        );
      }

      const producto = this.productoRepository.create({
        ...createProductoDto,
        categoria,
        fechaCreacion: new Date(),
      });

      await this.productoRepository.save(producto);

      // Devolver el producto creado
      return producto;
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Manejar excepción específica (categoría no encontrada)
        throw new NotFoundException(error.message);
      } else if (error.code === '23503') {
        // Manejar violación de clave externa (categoríaId no válido)
        throw new BadRequestException(
          'La categoría especificada no es válida.',
        );
      }
    }
  }

  obtenerTodosLosProductos() {
    return this.productoRepository.find();
  }

  async obtenerUnProducto(id: number) {
    const producto = await this.productoRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  async actualizarProducto(id: number, updateProductoDto: UpdateProductoDto) {
    const producto = await this.productoRepository.preload({
      id: id,
      ...updateProductoDto,
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    await this.productoRepository.save(producto);
    return producto;
  }

  async eliminarProducto(id: number) {
    const producto = await this.obtenerUnProducto(id);
    await this.productoRepository.remove(producto);
  }
}
