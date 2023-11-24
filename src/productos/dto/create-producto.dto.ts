import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsNumber,
  IsPositive,
  IsInt,
} from 'class-validator';

export class CreateProductoDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Camiseta',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  nombre: string;

  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Una camiseta de algodón de alta calidad.',
  })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  descripcion: string;

  @ApiProperty({
    description: 'Disponibilidad del producto',
    example: true,
  })
  @IsBoolean({ message: 'La disponibilidad debe ser un valor booleano' })
  disponibilidad: boolean;

  @ApiProperty({
    description: 'Precio del producto',
    example: 19.99,
  })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser un número positivo' })
  precio: number;

  @ApiProperty({
    description: 'ID de la categoría a la que pertenece el producto',
    example: 1,
  })
  @IsInt({ message: 'El ID de la categoría debe ser un número entero' })
  @IsPositive({ message: 'El ID de la categoría debe ser un número positivo' })
  categoriaId: number;
}
