import { ApiProperty } from '@nestjs/swagger';
import { Producto } from 'src/productos/entities/producto.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({
    description: 'Id de la categoría del producto.',
    example: '1',
  })
  id: number;

  @Column('varchar', { length: 50, unique: true })
  @ApiProperty({
    description: 'Nombre de la categoría del producto.',
    example: 'Alcancía',
  })
  nombre: string;

  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[];
}
