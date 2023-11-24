import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriasService {
  private readonly logger = new Logger('CategoriasService');

  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async crearCategoria(createCategoriaDto: CreateCategoriaDto) {
    const { nombre } = createCategoriaDto;

    const existingCategoria = await this.categoriaRepository.findOne({
      where: { nombre },
    });

    if (existingCategoria) {
      throw new ConflictException(
        'Ya existe una categoría con el mismo nombre.',
      );
    }

    try {
      const categoria = this.categoriaRepository.create(createCategoriaDto);
      await this.categoriaRepository.save(categoria);
      return categoria;
    } catch (error) {
      this.ManejadorDeErrores(error);
    }
  }

  obtenerTodasLasCategorias() {
    return this.categoriaRepository.find();
  }

  async obtenerUnaCategoria(term: number) {
    let categoria: Categoria;

    // Verificar si el término es un número válido
    if (isNaN(term)) {
      throw new NotFoundException('El término debe ser un número válido');
    }

    // Buscar por ID
    categoria = await this.categoriaRepository.findOneBy({ id: term });

    // Si no se encuentra por ID, buscar por nombre
    if (!categoria) {
      const queryBuilder =
        this.categoriaRepository.createQueryBuilder('categoria');
      categoria = await queryBuilder
        .where('LOWER(categoria.name) = :term', {
          term: String(term).toLowerCase(),
        })
        .getOne();
    }

    // Si no se encuentra la categoría, lanzar una excepción
    if (!categoria) {
      throw new NotFoundException(
        `Categoría con el término '${term}' no encontrada`,
      );
    }

    return categoria;
  }

  async actualizarCategoria(
    id: number,
    updateCategoriaDto: UpdateCategoriaDto,
  ) {
    const categoria = await this.categoriaRepository.preload({
      id: id,
      ...updateCategoriaDto,
    });

    if (!categoria)
      throw new NotFoundException(`Marca con ID ${id} no encontrada`);

    try {
      await this.categoriaRepository.save(categoria);
      return categoria;
    } catch (error) {
      this.ManejadorDeErrores(error);
    }
  }

  async eliminarCategoria(id: number) {
    const categoria = await this.obtenerUnaCategoria(id);
    await this.categoriaRepository.remove(categoria);
  }

  private ManejadorDeErrores(error: any) {
    this.logger.error(error);

    throw new InternalServerErrorException(
      'Ocurrió un error inesperado. Por favor, verifica los registros del servidor.',
    );
  }
}
