import { LoginSubmitDTO } from "../dtos/login-submit.dto";
import { RegisterUserDTO } from "../dtos/register-user.dto";

export type AuthUserIdentity = {
  id: string;
  email: string;
};

export type IAuthProvider = {
  login: (credentials: LoginSubmitDTO) => Promise<AuthUserIdentity>;

  register: (data: RegisterUserDTO) => Promise<AuthUserIdentity>;

  logout: () => Promise<void>;

  getAuthenticatedIdentity: () => Promise<AuthUserIdentity | null>;

  verifyToken: (token: string) => Promise<AuthUserIdentity | null>;
};
