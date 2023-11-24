import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Role } from '../enums/role.enum';
import { Roles } from './role.decorator';

export function Auth(rol: Role) {
  return applyDecorators(Roles(rol), UseGuards(AuthGuard, RoleGuard));
}
