import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationResponse } from '@authentication/response/login.response';
import { compare, hashSync } from 'bcrypt';
import { UserService } from '@user/user.service';
import { CreateUserDto } from '@user/dto';
import { RoleRepository } from '@authentication/model';
import { sign } from 'jsonwebtoken';
import { AuthenticationDto } from '@authentication/dto';
import { UserEntity } from '@user/model/user/user.entity';
import { JwtTokenInterface } from '@authentication/interface/jwt-token.interface';
import { RoleEnum } from '@constant/enum';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly roleRepository: RoleRepository,
  ) {
  }

  async signup(signupDto: AuthenticationDto): Promise<AuthenticationResponse> {
    const hashedPassword = this.hashPassword(signupDto.password);
    const role = await this.roleRepository.findOne({ where: { name: RoleEnum.CUSTOMER } });
    const createdUser = await this.userService.create(
      new CreateUserDto({
        username: signupDto.username,
        password: hashedPassword,
        roleId: role.id,
      }),
    );
    return new AuthenticationResponse({ result: 'success', token: this.createToken(createdUser) });
  }

  async login(loginDto: AuthenticationDto): Promise<AuthenticationResponse> {
    const user = await this.userService.getByUsername(loginDto.username);
    if (!user) throw new UnauthorizedException();
    const isPasswordCorrect = await compare(loginDto.password, user.password);
    if (!isPasswordCorrect) throw new UnauthorizedException();
    return new AuthenticationResponse({ result: 'success', token: this.createToken(user) });
  }

  private hashPassword(originalPassword: string): string {
    return hashSync(originalPassword, 12);
  }

  private createToken(user: UserEntity): string {
    const jwtPayload: JwtTokenInterface = {
      id: user.id,
    };
    return sign(jwtPayload, 'this is very strong!!', { expiresIn: '10 min' });
  }
}
