// src/modules/auth/use-cases/require-auth-role.use-case.ts
import { redirect } from "next/navigation";
import { getCurrentUserUseCase } from "./get-current-user.use-case";
import { UserRole } from "@/shared/types/domain/zod.types";

export async function requireUserWithRoles(allowedRoles: UserRole[]) {
  // Chamada 100% limpa (já usa o supabaseAuthRepository por baixo)
  const user = await getCurrentUserUseCase();

  if (!user) {
    redirect("/login");
  }

  if (!allowedRoles.includes(user.role as UserRole)) {
    redirect("/ticket");
  }

  return user;
}

export async function requireAdminOrTechnician() {
  return requireUserWithRoles(["ADMIN", "TECHNICIAN"]);
}