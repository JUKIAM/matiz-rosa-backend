import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Producto } from './entities/producto.entity';
import { Role } from 'src/autenticacion/enums/role.enum';
import { Auth } from 'src/autenticacion/decorators/auth.decorator';

@Auth(Role.Administrador)
@ApiBearerAuth()
@ApiTags('productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({
    status: 200,
    description: 'Producto creado exitosamente',
    type: Producto,
  })
  @ApiBody({ type: CreateProductoDto })
  crearProducto(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.crearProducto(createProductoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los productos',
    type: Producto,
    isArray: true,
  })
  obtenerTodosLosProductos() {
    return this.productosService.obtenerTodosLosProductos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiParam({ name: 'id', description: 'ID del producto', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Producto encontrado exitosamente',
    type: Producto,
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  obtenerUnProducto(@Param('id') id: string) {
    return this.productosService.obtenerUnProducto(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto por ID' })
  @ApiParam({ name: 'id', description: 'ID del producto', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado exitosamente',
    type: Producto,
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiBody({ type: UpdateProductoDto })
  actualizarProducto(
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    return this.productosService.actualizarProducto(+id, updateProductoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto por ID' })
  @ApiParam({ name: 'id', description: 'ID del producto', type: 'number' })
  @ApiResponse({ status: 204, description: 'Producto eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  eliminarProducto(@Param('id') id: string) {
    return this.productosService.eliminarProducto(+id);
  }
}
