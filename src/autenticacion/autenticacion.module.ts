import { Module } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { jwtConstants } from './constants/auth.constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AutenticacionController],
  providers: [AutenticacionService],
  imports: [
    UsuariosModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
})
export class AutenticacionModule {}
