import { User } from "@/shared/domain/types";

export type AuthTokenResponseDTO = {
  accessToken: string;
  refreshToken: string;
  user: Pick<User, 'id' | 'name' | 'email' | 'role' | 'departmentId'>;
};