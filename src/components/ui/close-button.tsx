// src/components/features/auth/components/close-button.tsx
"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface CloseButtonProps {
  onClick?: () => void;
}

export function CloseButton({ onClick }: CloseButtonProps) {
  const router = useRouter();

  // Se não passar uma função customizada no onClick, por padrão ele volta a página anterior
  const handleClose = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={handleClose}
      className="absolute top-4 right-4 h-7 w-7 rounded-md bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors z-20"
      aria-label="Fechar"
    >
      <X className="h-4 w-4" />
    </Button>
  );
}