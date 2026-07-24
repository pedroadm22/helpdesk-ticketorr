// src/modules/auth/ui/components/close-button.tsx
"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CloseButton() {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="absolute top-4 right-4 h-7 w-7 rounded-md bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800"
      aria-label="Fechar"
    >
      <X className="h-4 w-4" />
    </Button>
  );
}