import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({
    description: 'Nombre de la categoría del producto.',
    example: 'Alcancía',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
