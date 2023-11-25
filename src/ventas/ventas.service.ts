import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from './entities/venta.entity';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { UpdateVentaDto } from './dto/update-venta.dto';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
    private readonly usuariosService: UsuariosService,
  ) {}

  async crearVenta(createVentaDto: CreateVentaDto) {
    try {
      // Validar que el cliente existe
      const cliente = await this.usuariosService.obtenerUnUsuario(
        createVentaDto.clienteId,
      );

      if (!cliente) {
        throw new NotFoundException(
          `El cliente con ID ${createVentaDto.clienteId} no existe`,
        );
      }

      const venta = this.ventaRepository.create({
        ...createVentaDto,
        cliente,
        fechaDeVenta: new Date(),
      });

      await this.ventaRepository.save(venta);

      // Devolver la venta creada
      return venta;
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Manejar excepción específica (cliente no encontrado)
        throw new NotFoundException(error.message);
      } else if (error.code === '23503') {
        // Manejar violación de clave externa (clienteId no válido)
        throw new BadRequestException('El cliente especificado no es válido.');
      }
    }
  }

  obtenerTodasLasVentas() {
    return this.ventaRepository.find();
  }

  async obtenerUnaVenta(id: number) {
    const venta = await this.ventaRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });

    if (!venta) {
      throw new NotFoundException(`Venta con ID ${id} no encontrada`);
    }

    return venta;
  }

  async actualizarVenta(id: number, updateVentaDto: UpdateVentaDto) {
    const venta = await this.ventaRepository.preload({
      id: id,
      ...updateVentaDto,
    });

    if (!venta) {
      throw new NotFoundException(`Venta con ID ${id} no encontrada`);
    }

    await this.ventaRepository.save(venta);
    return venta;
  }

  async eliminarVenta(id: number) {
    const venta = await this.obtenerUnaVenta(id);
    await this.ventaRepository.remove(venta);
  }
}
