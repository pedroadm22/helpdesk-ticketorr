import { User } from "@/shared/domain/types";

export type RequestPasswordResetDTO = {
  email: User['email'];
};

export type ResetPasswordDTO = {
  token: string;
  newPassword: string;
};