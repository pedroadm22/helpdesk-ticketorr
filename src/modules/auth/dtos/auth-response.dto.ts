import type { UserResponseDTO } from "@/modules/catalog/users/dtos/user-response.dto";

export interface AuthResponseDTO {
  user: UserResponseDTO;
  accessToken?: string;
}