import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const ROLE_KEY = 'rol';
export const Roles = (rol: Role) => SetMetadata(ROLE_KEY, rol);
