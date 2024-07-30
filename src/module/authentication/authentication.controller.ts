import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResponse } from '@authentication/response/login.response';
import { AuthenticationDto } from '@authentication/dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {
  }

  @Post('/signup')
  signup(@Body() signupDto: AuthenticationDto): Promise<AuthenticationResponse> {
    return this.authenticationService.signup(signupDto);
  }

  @Post('/login')
  login(@Body() loginDto: AuthenticationDto): Promise<AuthenticationResponse> {
    return this.authenticationService.login(loginDto);
  }
}
