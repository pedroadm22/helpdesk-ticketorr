import { UserRole } from "@/shared/types/domain/zod.types";

export type SessionUserDTO = {
  id: string;        // O UUID do usuário no banco (ex: "550e8400-e29b-41d4-a716-446655440000")
  email: string;
  role: UserRole;    // "CLIENT" | "AGENT" | "ADMIN"
};