import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriasModule } from './categorias/categorias.module';
import { ProductosModule } from './productos/productos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { VentasModule } from './ventas/ventas.module';
import { DetalleVentasModule } from './detalle-ventas/detalle-ventas.module';
import { CarritosModule } from './carritos/carritos.module';

@Module({
  imports: [CategoriasModule, ProductosModule, UsuariosModule, VentasModule, DetalleVentasModule, CarritosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
