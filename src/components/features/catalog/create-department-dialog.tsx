"use client";

import { useState, useTransition } from "react";
import { Plus, Building2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { createDepartmentAction } from "@/actions/departments/create-department.action";

export function CreateDepartmentDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);

    startTransition(async () => {
      const res = await createDepartmentAction({ name, description });

      if (res.success) {
        setName("");
        setDescription("");
        setOpen(false);
      } else {
        setErrorMessage(res.error || "Erro inesperado.");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-md shadow-emerald-950/40 gap-2 cursor-pointer transition-all">
          <Plus className="h-4 w-4" />
          Novo Departamento
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25 bg-zinc-950/90 backdrop-blur-2xl border-emerald-500/20 text-zinc-100 shadow-2xl shadow-emerald-950/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-emerald-400 text-lg font-bold">
            <Building2 className="h-5 w-5 text-emerald-400" />
            Criar Departamento
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Adicione um novo setor para organizar os chamados da plataforma.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {errorMessage && (
            <div className="p-3 text-xs rounded-md bg-red-950/40 border border-red-500/30 text-red-300">
              {errorMessage}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="dept-name" className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">
              Nome do Departamento *
            </Label>
            <Input
              id="dept-name"
              placeholder="Ex: Suporte Técnico, Recursos Humanos"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-zinc-900/80 border-emerald-500/20 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dept-desc" className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">
              Descrição (Opcional)
            </Label>
            <Textarea
              id="dept-desc"
              placeholder="Descreva brevemente as responsabilidades deste setor..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="bg-zinc-900/80 border-emerald-500/20 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40 resize-none"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-zinc-700 bg-zinc-900/60 text-zinc-200 hover:bg-zinc-100 hover:text-zinc-950 focus:bg-zinc-100 focus:text-zinc-950 cursor-pointer transition-colors"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium gap-2"
            >
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Salvar Departamento
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}