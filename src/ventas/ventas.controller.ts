import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Venta } from './entities/venta.entity';
import { VentasService } from './ventas.service';
import { Role } from 'src/autenticacion/enums/role.enum';
import { Auth } from 'src/autenticacion/decorators/auth.decorator';

@Auth(Role.Comprador)
@ApiBearerAuth()
@ApiTags('ventas')
@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva venta' })
  @ApiResponse({
    status: 201,
    description: 'Venta creada exitosamente',
    type: Venta,
  })
  @ApiBody({ type: CreateVentaDto })
  crearVenta(@Body() createVentaDto: CreateVentaDto) {
    return this.ventasService.crearVenta(createVentaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las ventas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todas las ventas',
    type: Venta,
    isArray: true,
  })
  obtenerTodasLasVentas() {
    return this.ventasService.obtenerTodasLasVentas();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una venta por ID' })
  @ApiParam({ name: 'id', description: 'ID de la venta', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Venta encontrada exitosamente',
    type: Venta,
  })
  @ApiResponse({ status: 404, description: 'Venta no encontrada' })
  obtenerUnaVenta(@Param('id') id: string) {
    return this.ventasService.obtenerUnaVenta(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una venta por ID' })
  @ApiParam({ name: 'id', description: 'ID de la venta', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Venta actualizada exitosamente',
    type: Venta,
  })
  @ApiResponse({ status: 404, description: 'Venta no encontrada' })
  @ApiBody({ type: UpdateVentaDto })
  actualizarVenta(
    @Param('id') id: string,
    @Body() updateVentaDto: UpdateVentaDto,
  ) {
    return this.ventasService.actualizarVenta(+id, updateVentaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una venta por ID' })
  @ApiParam({ name: 'id', description: 'ID de la venta', type: 'number' })
  @ApiResponse({ status: 204, description: 'Venta eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Venta no encontrada' })
  eliminarVenta(@Param('id') id: string) {
    return this.ventasService.eliminarVenta(+id);
  }
}
