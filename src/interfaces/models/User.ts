export interface Tokens {
  kind: string;
  accessToken: string;
  tokenSecret?: string;
}

export interface IUser {
  email: string;
  password: string;

  tokens: Tokens[];

  avatar: string;
  createdAt: Date;
}

export default IUser;
