// src/components/ui/confirm-delete-button.tsx
"use client";

import { useTransition, useState } from "react";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button"; // Seu componente customizado
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface ConfirmDeleteButtonProps {
  onConfirm: () => Promise<{ success: boolean; error?: string }>;
  title?: string;
  description?: string;
  size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
  className?: string;
}

export function ConfirmDeleteButton({
  onConfirm,
  title = "Confirmar exclusão",
  description = "Tem certeza de que deseja remover este item? Esta ação não pode ser desfeita.",
  size = "icon-sm",
  className,
}: ConfirmDeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    setError(null);
    startTransition(async () => {
      const res = await onConfirm();
      if (res?.success) {
        setIsOpen(false);
      } else {
        setError(res?.error || "Erro ao tentar excluir.");
      }
    });
  };

  return (
    <>
      {/* Usando variant="ghost" ou "destructive" diretamente do seu Button */}
      <Button
        size={size}
        variant="ghost"
        onClick={() => setIsOpen(true)}
        className={`text-zinc-400 hover:text-red-400 hover:bg-red-500/10 ${className}`}
        aria-label="Excluir item"
      >
        <Trash2 />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-zinc-100 sm:max-w-md">
          <DialogHeader className="space-y-2">
            <div className="flex items-center gap-2 text-red-400">
              <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                <AlertTriangle className="size-5" />
              </div>
              <DialogTitle className="text-base font-semibold">{title}</DialogTitle>
            </div>
            <DialogDescription className="text-xs text-zinc-400 pt-1">
              {description}
            </DialogDescription>
          </DialogHeader>

          {error && (
            <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-300 rounded-lg text-xs">
              {error}
            </div>
          )}

          <DialogFooter className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            {/* Aqui usamos a variant="destructive" padrão do seu botão */}
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? <Loader2 className="animate-spin" /> : "Confirmar e Excluir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}