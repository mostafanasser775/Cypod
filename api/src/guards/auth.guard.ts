
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) throw new UnauthorizedException('Token not found');
        try {
            const payload = this.jwtService.decode(token);
            console.log(payload);
            request.user = payload;
        }
        catch {
            throw new UnauthorizedException('Invalid Token')
        }
        return true;
    }
    private extractTokenFromHeader(request: Request): string | null {
       return request.headers.authorization?.split(' ')[1] || null;
    }
}

