import { Module } from '@nestjs/common';
import { DetalleVentasService } from './detalle-ventas.service';
import { DetalleVentasController } from './detalle-ventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleVenta } from './entities/detalle-venta.entity';
import { ProductosModule } from 'src/productos/productos.module';
import { VentasModule } from 'src/ventas/ventas.module';

@Module({
  controllers: [DetalleVentasController],
  providers: [DetalleVentasService],
  imports: [
    TypeOrmModule.forFeature([DetalleVenta]),
    ProductosModule,
    VentasModule,
  ],
})
export class DetalleVentasModule {}
