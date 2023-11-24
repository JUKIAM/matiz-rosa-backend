import { Injectable } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';

@Injectable()
export class VentasService {
  crearVenta(createVentaDto: CreateVentaDto) {
    return 'This action adds a new venta';
  }

  obtenerTodasLasVentas() {
    return `This action returns all ventas`;
  }

  obtenerUnaVenta(id: number) {
    return `This action returns a #${id} venta`;
  }

  actualizarVenta(id: number, updateVentaDto: UpdateVentaDto) {
    return `This action updates a #${id} venta`;
  }

  eliminarVenta(id: number) {
    return `This action removes a #${id} venta`;
  }
}
