// src/app/(painel)/layout.tsx
import { AppShell } from "@/core/app-shell"; // Ajuste o caminho do import se necessário

export default function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell>
      {children}
    </AppShell>
  );
}