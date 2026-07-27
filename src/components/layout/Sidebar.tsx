"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Kanban, Ticket, ShieldCheck } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const pathname = usePathname();

  const itensMenu = [
    { label: "Dashboard", href: "/dashboard", icon: Kanban },
    { label: "Chamados", href: "/ticket", icon: Ticket },
    { label: "Admin", href: "/admin", icon: ShieldCheck },
  ];

  return (
    <aside className="w-64 h-screen bg-zinc-950 border-r border-zinc-900 p-4 space-y-6 flex flex-col justify-between">
      <div className="space-y-6">
        {/* Header do Logo */}
        <div className="px-2 py-4">
          <span className="text-lg font-bold tracking-wider text-blue-500 uppercase">
            Ticketorr
          </span>
        </div>

        {/* Navegação */}
        <nav className="space-y-1">
          {itensMenu.map((item) => {
            const itemAtivo =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            const Icone = item.icon;

            return (
              <Button
                key={item.href}
                variant="ghost"
                className={cn(
                  // 'p-0' remove o padding do Button para transferir totalmente para o Link
                  "w-full h-auto p-0 justify-start cursor-pointer text-sm font-medium transition-all duration-200 group",
                  itemAtivo
                    ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 hover:bg-blue-600/20 hover:text-blue-300"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 border border-transparent"
                )}
              >
                {/* O Link ocupa 100% da área e controla o layout horizontal (flex-row) */}
                <Link
                  href={item.href}
                  className="w-full flex items-center justify-start gap-3 px-4 py-3 cursor-pointer"
                >
                  <Icone
                    size={18}
                    className={cn(
                      "shrink-0 transition-colors",
                      itemAtivo
                        ? "text-blue-400"
                        : "text-zinc-500 group-hover:text-zinc-300"
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}