
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { users } from 'src/data';
import { Role, ROLES_KEY } from 'src/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const  {user}  = context.switchToHttp().getRequest();
    console.log('Role Guard',user)
    if(!user) {
      return false;
    }
    const userId= user.userId
    const DBUSER = users.find((userx) => userx.id === userId);
    if (!DBUSER) {
      return false;
    }
    return requiredRoles.some((role) => DBUSER.role?.includes(role));
  }
}
