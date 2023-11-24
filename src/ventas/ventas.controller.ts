import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';

@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Post()
  crearVenta(@Body() createVentaDto: CreateVentaDto) {
    return this.ventasService.crearVenta(createVentaDto);
  }

  @Get()
  obtenerTodasLasVentas() {
    return this.ventasService.obtenerTodasLasVentas();
  }

  @Get(':id')
  ObtenerUnaVenta(@Param('id') id: string) {
    return this.ventasService.obtenerUnaVenta(+id);
  }

  @Patch(':id')
  actualizarVenta(@Param('id') id: string, @Body() updateVentaDto: UpdateVentaDto) {
    return this.ventasService.actualizarVenta(+id, updateVentaDto);
  }

  @Delete(':id')
  eliminarVenta(@Param('id') id: string) {
    return this.ventasService.eliminarVenta(+id);
  }
}
