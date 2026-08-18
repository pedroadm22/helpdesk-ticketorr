import { headers } from "next/headers";
import { authClient } from "./auth-client";
import type { User } from "@/shared/domain/types";

export async function getAppUser(): Promise<User | null> {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session?.data?.user) return null;

  const rawUser = session.data.user as any;

  // 🟢 Converte para a sua Entidade de Domínio Pura
  return {
    id: rawUser.id,
    name: rawUser.name,
    email: rawUser.email,
    role: rawUser.role ?? "CLIENT",
    departmentId: rawUser.departmentId ?? null,
    avatarUrl: rawUser.image ?? null,
    active: true,
    createdAt: new Date(rawUser.createdAt),
    updatedAt: new Date(rawUser.updatedAt),
  };
}