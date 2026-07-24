import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface GlassCardProps {
  children: ReactNode;
}

export function GlassCard({ children }: GlassCardProps) {
  return (
    <Card className="relative w-full max-w-md p-8 rounded-2xl bg-zinc-950/40 backdrop-blur-md border border-emerald-500/20 shadow-2xl shadow-emerald-950/30 text-zinc-100">
      {children}
    </Card>
  );
}