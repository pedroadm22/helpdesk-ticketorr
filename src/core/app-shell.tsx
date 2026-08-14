// src/components/layout/AppShell.tsx
"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/shared/utils/cn";

// src/config/navigation.config.ts

export type UserRole = "ADMIN" | "TECHNICIAN" | "CLIENT"; 

interface AppShellProps {
  children: React.ReactNode;
  userRole?: UserRole; // 👈 Em vez de string, use o tipo específico
  userName?: string;
}

export function AppShell({ children, userRole = "CLIENT", userName = "Usuário" }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-screen flex-col bg-zinc-950 text-zinc-50 overflow-hidden">
      
      <Header 
        isSidebarOpen={isSidebarOpen} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        userName={userName}
      />

      <div className="flex flex-1 w-full overflow-hidden relative">
        
        <aside
          aria-label="Sidebar de Navegação"
          className={cn(
            "h-full border-r border-zinc-900 bg-zinc-950 transition-all duration-300 ease-in-out shrink-0",
            isSidebarOpen 
              ? "w-64 opacity-100" 
              : "w-0 opacity-0 border-none pointer-events-none"
          )}
        >
          <div className="w-64 h-full overflow-y-auto">
            {/* 👈 Repassa o userRole para a Sidebar */}
            <Sidebar userRole={userRole} />
          </div>
        </aside>

        <div className="flex flex-col flex-1 bg-zinc-950 overflow-y-auto">
          <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
          <Footer />
        </div>

      </div>
    </div>
  );
}