// src/app/login/page.tsx
import { LoginCard } from "@/components/features/login/LoginCard";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4 antialiased">
      <LoginCard />
    </main>
  );
}