"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createDepartmentAction } from "@/actions/departments/create-department.action";

interface DepartmentFormProps {
  department?: {
    id: string;
    name: string;
    description?: string | null;
    [key: string]: any; // Permite propriedades adicionais vindas do banco (ex: createdAt, servicesCount)
  };
}

export function DepartmentForm({ department }: DepartmentFormProps) {
  const [name, setName] = useState(department?.name || "");
  const [description, setDescription] = useState(department?.description || "");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setError(null);
    startTransition(async () => {
      const res = await createDepartmentAction({
        name,
        description,
      });

      if (res?.error) {
        setError(res.error);
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-8">
      <Link
        href="/departments"
        className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-emerald-400 transition-colors"
      >
        <ArrowLeft className="size-4" />
        Voltar para a lista
      </Link>

      <div className="p-6 bg-zinc-950/80 border border-zinc-800 rounded-2xl shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
            <Building2 className="size-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-zinc-100">
              {department ? "Editar Departamento" : "Novo Departamento"}
            </h1>
            <p className="text-xs text-zinc-400">
              {department
                ? "Altere os dados do departamento cadastrado."
                : "Preencha as informações do novo setor."}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-300 rounded-lg text-xs">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-400">Nome do Departamento</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: TI & Infraestrutura"
              className="bg-zinc-900 border-zinc-800 text-zinc-100"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-400">Descrição (Opcional)</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva as atribuições do departamento..."
              rows={4}
              className="bg-zinc-900 border-zinc-800 text-zinc-100 resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800/80">
            <Button type="button" variant="ghost">
              <Link href="/departments">Cancelar</Link>
            </Button>
            <Button
              type="submit"
              disabled={isPending || !name.trim()}
              className="bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              {isPending ? <Loader2 className="animate-spin" /> : "Salvar Departamento"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}