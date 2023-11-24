import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  crearProducto(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.crearProducto(createProductoDto);
  }

  @Get()
  obtenerTodosLosProductos() {
    return this.productosService.obtenerTodosLosProductos();
  }

  @Get(':id')
  obtenerUnProducto(@Param('id') id: string) {
    return this.productosService.obtenerUnProducto(+id);
  }

  @Patch(':id')
  actualizarProducto(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.actualizarProducto(+id, updateProductoDto);
  }

  @Delete(':id')
  eliminarProducto(@Param('id') id: string) {
    return this.productosService.eliminarProducto(+id);
  }
}
