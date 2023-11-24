import { Categoria } from 'src/categorias/entities/categoria.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'boolean' })
  disponibilidad: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoriaId' })
  categoria: Categoria;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;
}
