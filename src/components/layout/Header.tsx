"use client";
import { HiOutlineTicket } from "react-icons/hi";

import { Menu, X, User } from "lucide-react";
import { LogoutButton } from "../ui/LogoutButton";

interface HeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  userName: string;
}

export function Header({ isSidebarOpen, onToggleSidebar, userName }: HeaderProps) {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-6 backdrop-blur">
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleSidebar}
          className="rounded p-1 hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-zinc-50"
          aria-label={isSidebarOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        <div className="flex items-center gap-2 font-semibold text-lg tracking-wide text-blue-500">
          <HiOutlineTicket className="h-6 w-6 rotate-135" />
          <span>Ticketorr</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-1.5 text-sm font-medium border border-zinc-700">
          <User size={16} className="text-zinc-400" />
          <span className="max-w-30 truncate text-xs text-zinc-300">{userName}</span>
        </div>
        <LogoutButton/>
      </div>

    </header>
  );
}