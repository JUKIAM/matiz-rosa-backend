import { ApiProperty } from '@nestjs/swagger';
import { Producto } from 'src/productos/entities/producto.entity';
import { Venta } from 'src/ventas/entities/venta.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DetalleVenta {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({
    description: 'Id del detalle de venta.',
    example: '1',
  })
  id: number;

  @ManyToOne(() => Producto, (producto) => producto.detallesVentas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productoId' })
  producto: Producto;

  @ManyToOne(() => Venta, (venta) => venta.detallesVentas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ventaId' })
  venta: Venta;
}
