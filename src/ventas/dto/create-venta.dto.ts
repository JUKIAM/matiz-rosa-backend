import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class CreateVentaDto {
  @ApiProperty({
    example: 1,
    description: 'Identificador del cliente asociado a la venta',
  })
  @IsNumber()
  readonly clienteId: number;

  @ApiProperty({ example: 100.0, description: 'Total a pagar por la venta' })
  @IsNumber()
  readonly totalPagar: number;

  @ApiProperty({
    example: 15.0,
    description: 'Impuesto sobre el valor añadido (IVA)',
  })
  @IsNumber()
  readonly iva: number;

  @ApiProperty({ example: true, description: 'Estado de la venta' })
  @IsBoolean()
  readonly estado: boolean;
}
