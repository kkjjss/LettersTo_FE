export interface Token {
  idToken: string;
}

export interface RegisterToken {
  registerToken: string;
  accessToken: string;
  refreshToken: string;
  verified: boolean;
}
