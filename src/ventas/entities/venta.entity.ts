import { Usuario } from 'src/usuarios/entities/usuario.entity';

export class Venta {
  id: number;
  cliente: Usuario;
  totalPagar: number;
  iva: number;
  estado: boolean;
  fechaDeVenta: Date;
}
