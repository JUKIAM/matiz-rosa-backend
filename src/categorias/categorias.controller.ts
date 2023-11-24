import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  crearCategoria(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.crearCategoria(createCategoriaDto);
  }

  @Get()
  obtenerTodasLasCategorias() {
    return this.categoriasService.obtenerTodasLasCategorias();
  }

  @Get(':id')
  obtenerUnaCategoria(@Param('id') id: string) {
    return this.categoriasService.obtenerUnaCategoria(+id);
  }

  @Patch(':id')
  actualizarCategoria(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.actualizarCategoria(+id, updateCategoriaDto);
  }

  @Delete(':id')
  eliminarCategoria(@Param('id') id: string) {
    return this.categoriasService.eliminarCategoria(+id);
  }
}
