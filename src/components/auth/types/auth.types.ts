export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type DecodedToken = {
  sub: number;
  email: string;
  iat: string;
  exp: string;
};

export type SignUpDto = {
  email: string;
  password: string;
  displayName: string;
};
