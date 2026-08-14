// src/components/layout/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, UserRole } from "@/config/navigation.config";
import { cn } from "@/shared/utils/cn";
import { Ticket } from "lucide-react";

interface SidebarProps {
  userRole: UserRole;
}

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();

  // Filtra apenas as rotas permitidas para a role atual
  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800/80 flex flex-col h-screen sticky top-0 p-4">
      {/* Brand / Logo */}
      <div className="flex items-center gap-2.5 px-3 py-4 mb-4 border-b border-zinc-800/60">
        <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <Ticket className="size-4" />
        </div>
        <span className="font-bold text-zinc-100 tracking-tight text-lg">
          Ticketorr
        </span>
      </div>

      {/* Menus Dinâmicos */}
      <nav className="space-y-1 flex-1">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  isActive ? "text-emerald-400" : "text-zinc-500"
                )}
              />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Indicator de Role do Usuário no rodapé da Sidebar */}
      <div className="pt-4 border-t border-zinc-800/60 px-3">
        <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
          Perfil Conectado
        </p>
        <p className="text-xs font-semibold text-emerald-400 mt-0.5">
          {userRole === "ADMIN" && "Administrador"}
          {userRole === "TECHNICIAN" && "Técnico de Suporte"}
          {userRole === "CLIENT" && "Cliente / Solicitante"}
        </p>
      </div>
    </aside>
  );
}