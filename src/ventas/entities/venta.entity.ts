import { ApiProperty } from '@nestjs/swagger';
import { DetalleVenta } from 'src/detalle-ventas/entities/detalle-venta.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Venta {
  @ApiProperty({ example: 1, description: 'Identificador único de la venta' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ type: Usuario, description: 'Cliente asociado a la venta' })
  @ManyToOne(() => Usuario, { eager: true }) // Puedes agregar opciones específicas de TypeORM aquí
  cliente: Usuario;

  @ApiProperty({ example: 100.0, description: 'Total a pagar por la venta' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPagar: number;

  @ApiProperty({
    example: 15.0,
    description: 'Impuesto sobre el valor añadido (IVA)',
  })
  @Column({ type: 'decimal', precision: 5, scale: 2 })
  iva: number;

  @ApiProperty({ example: true, description: 'Estado de la venta' })
  @Column({ type: 'boolean' })
  estado: boolean;

  @ApiProperty({
    example: '2023-11-24T12:00:00Z',
    description: 'Fecha de la venta',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaDeVenta: Date;

  @ApiProperty({
    type: () => DetalleVenta,
    isArray: true,
    description: 'Detalles de la venta',
  })
  @OneToMany(() => DetalleVenta, (detalleVenta) => detalleVenta.venta)
  detallesVentas: DetalleVenta[];
}
