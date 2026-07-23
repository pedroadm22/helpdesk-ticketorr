"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/infrastructure/auth";
import { headers } from "next/headers";

export type AuthActionResult = {
  success: boolean;
  message?: string;
};

export async function signOutAction(): Promise<AuthActionResult> {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    revalidatePath("/");
  } catch (error) {
    return { success: false, message: "Erro ao encerrar a sessão." };
  }

  redirect("/login");
}

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  return session.user;
}