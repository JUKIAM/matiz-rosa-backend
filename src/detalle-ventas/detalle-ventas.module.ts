import { Module } from '@nestjs/common';
import { DetalleVentasService } from './detalle-ventas.service';
import { DetalleVentasController } from './detalle-ventas.controller';

@Module({
  controllers: [DetalleVentasController],
  providers: [DetalleVentasService],
})
export class DetalleVentasModule {}
