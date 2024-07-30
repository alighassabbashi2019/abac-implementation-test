export class AuthenticationResponse {
  constructor(obj: Partial<AuthenticationResponse>) {
    Object.assign(this, obj);
  }

  result: 'success' | 'failure';
  token: string;
}
