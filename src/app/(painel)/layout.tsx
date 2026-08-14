// src/app/(painel)/layout.tsx
import { AppShell } from "@/core/app-shell";
import { getCurrentUserUseCase } from "@/modules/auth/use-cases/get-current-user.use-case";
import { redirect } from "next/navigation";

export default async function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUserUseCase();

  if (!user) {
    redirect("/login");
  }

  return (
    // 👈 Força o tipo para corresponder ao que a Sidebar espera
    <AppShell userRole={user.role as any} userName={user.name || "Usuário"}>
      {children}
    </AppShell>
  );
}