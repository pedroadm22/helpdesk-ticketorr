// src/modules/auth/ui/components/auth-options.tsx
"use client";

import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function AuthOptions() {
  return (
    <div className="flex items-center justify-between text-xs text-zinc-400">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="remember" 
          className="border-zinc-700 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600" 
        />
        <Label 
          htmlFor="remember" 
          className="text-xs text-zinc-400 hover:text-zinc-300 cursor-pointer font-normal"
        >
          Lembrar-me
        </Label>
      </div>
      
      <Link 
        href="/recuperar-senha" 
        className="hover:text-emerald-400 transition-colors"
      >
        Esqueceu a senha?
      </Link>
    </div>
  );
}