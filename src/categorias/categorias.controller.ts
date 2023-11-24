import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Categoria } from './entities/categoria.entity';

@ApiBearerAuth()
@ApiTags('categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiResponse({
    status: 201,
    description: 'Categoría creada exitosamente',
    type: Categoria,
  })
  crearCategoria(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.crearCategoria(createCategoriaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todas las categorías',
    type: Categoria,
    isArray: true,
  })
  obtenerTodasLasCategorias() {
    return this.categoriasService.obtenerTodasLasCategorias();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  @ApiResponse({
    status: 200,
    description: 'Categoría encontrada exitosamente',
    type: Categoria,
  })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  obtenerUnaCategoria(@Param('id') id: string) {
    return this.categoriasService.obtenerUnaCategoria(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una categoría por ID' })
  @ApiResponse({
    status: 200,
    description: 'Categoría actualizada exitosamente',
    type: Categoria,
  })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  actualizarCategoria(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriasService.actualizarCategoria(+id, updateCategoriaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría por ID' })
  @ApiResponse({ status: 204, description: 'Categoría eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  eliminarCategoria(@Param('id') id: string) {
    return this.categoriasService.eliminarCategoria(+id);
  }
}
