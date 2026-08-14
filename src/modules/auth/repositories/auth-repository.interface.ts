import type { LoginDTO } from "../dtos/login.dto";
import type { RegisterDTO } from "../dtos/register.dto";
import type { ForgotPasswordDTO } from "../dtos/forgot-password.dto";
import type { ResetPasswordDTO } from "../dtos/reset-password.dto";
import type { AuthResponseDTO } from "../dtos/auth-response.dto";
import type { UserResponseDTO } from "@/modules/catalog/users/dtos/user-response.dto";

export interface IAuthRepository {
  login(dto: LoginDTO): Promise<AuthResponseDTO>;
  register(dto: RegisterDTO): Promise<AuthResponseDTO>; // Registra e define role = CLIENT automaticamente
  logout(): Promise<void>;
  getCurrentUser(): Promise<UserResponseDTO | null>;
  forgotPassword(dto: ForgotPasswordDTO): Promise<void>;
  resetPassword(dto: ResetPasswordDTO): Promise<void>;
}