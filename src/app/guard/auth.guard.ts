import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { decode } from 'jsonwebtoken';
import { JwtTokenInterface } from '@authentication/interface/jwt-token.interface';
import { UserEntity } from '@user/model/user/user.entity';
import { UserService } from '@user/user.service';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserEntity;
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    if (!token) throw new UnauthorizedException('No Token provided');

    const decodedToken: JwtTokenInterface = decode(token) as JwtTokenInterface;
    const now = Date.now();
    const currentUser = await this.userService.getById(decodedToken.id, ['role']);
    if (
      !decodedToken ||
      !decodedToken.exp ||
      decodedToken.exp > now ||
      !currentUser
    ) {
      throw new UnauthorizedException('Invalid or expired token');
    }
    request.currentUser = currentUser;
    return true;
  }
}
