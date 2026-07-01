"use client"; // 🚨 Obrigatório para usar o usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Kanban, Ticket, Home, Settings } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export function Sidebar() {
  const pathname = usePathname();

  // 1. Centralizamos os links em um array para evitar repetição de código
  const itensMenu = [
    { label: "Dashboard", href: "/dashboard", icon: Kanban },
    { label: "Chamados", href: "/ticket", icon: Ticket },
  ];

  return (
    <aside className="w-64 h-screen bg-zinc-950 border-r border-zinc-900 p-4 space-y-6">
      <div className="px-2 py-4">
        <span className="text-lg font-bold tracking-wider text-blue-500 uppercase">
          Ticketorr
        </span>
      </div>

      <nav className="space-y-1">
        {itensMenu.map((item) => {
          // 2. A MÁGICA AQUI: Verifica se a rota atual começa com o href do item
          // O .startsWith garante que se você estiver em "/tickets/novo", o botão "/tickets" continue ativo!
          const itemAtivo = item.href === "/" 
            ? pathname === "/" 
            : pathname.startsWith(item.href);

          const Icone = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                // Classes Base (Layout e comportamento comum para todos os botões)
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 group",
                
                // Classes quando o item ESTÁ SELECIONADO
                itemAtivo
                  ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                  
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 border border-transparent"
              )}
            >
              <Icone 
                size={18} 
                className={cn(
                  "transition-colors",
                  itemAtivo ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-300"
                )} 
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}