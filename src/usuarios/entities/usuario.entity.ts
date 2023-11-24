import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/autenticacion/enums/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({
    description: 'Identificador único de un usuario',
    example: '1',
  })
  id: number;

  @Column('varchar', { length: 100, nullable: true, unique: true })
  @ApiProperty({
    description: 'El correo electrónico del usuario',
    example: 'usuario@matizrosa.com',
  })
  correo: string;

  @Column('text', { nullable: false, select: false })
  @ApiProperty({
    description: 'La contraseña del usuario',
    example: 'admin123',
  })
  contraseña: string;

  @Column({ type: 'enum', enum: Role, default: Role.Administrador })
  @ApiProperty({
    description: 'El rol del usuario',
    example: 'Administrador',
    enum: Role,
  })
  role: Role;

  @Column('boolean', { default: true })
  @ApiProperty({
    description: 'Indica si el usuario está activo',
    example: true,
  })
  estaActivo: boolean;

  @CreateDateColumn()
  @ApiProperty({
    description: 'La fecha y hora en que se creó el usuario.',
    example: '2023-09-29T12:00:00Z',
  })
  fechaCreacion: Date;
}
