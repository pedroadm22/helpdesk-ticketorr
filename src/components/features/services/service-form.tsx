"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { saveServiceAction } from "@/actions/services/save-service.action";

interface ServiceFormProps {
  departmentsList: { id: string; name: string }[];
  service?: {
    id: string;
    name: string;
    description?: string | null;
    departmentId: string;
    [key: string]: any;
  };
}

export function ServiceForm({ departmentsList, service }: ServiceFormProps) {
  const [name, setName] = useState(service?.name || "");
  const [description, setDescription] = useState(service?.description || "");
const [departmentId, setDepartmentId] = useState<string | null>(service?.departmentId || null);  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !departmentId) return;

    setError(null);
    startTransition(async () => {
      const res = await saveServiceAction({
        id: service?.id,
        name,
        description,
        departmentId,
      });

      if (res?.error) {
        setError(res.error);
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-8">
      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-emerald-400 transition-colors"
      >
        <ArrowLeft className="size-4" />
        Voltar para a lista
      </Link>

      <div className="p-6 bg-zinc-950/80 border border-zinc-800 rounded-2xl shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
            <Wrench className="size-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-zinc-100">
              {service ? "Editar Serviço" : "Novo Serviço"}
            </h1>
            <p className="text-xs text-zinc-400">
              {service
                ? "Atualize as informações do serviço cadastrado."
                : "Cadastre um novo tipo de atendimento no catálogo."}
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
            <label className="text-xs font-semibold text-zinc-400">
              Departamento Responsável
            </label>
            <Select
              value={departmentId}
              onValueChange={(val) => setDepartmentId(val)}
            >
              <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-100">
                <SelectValue placeholder="Selecione um setor...">
                  {/* Encontra o nome do departamento atual para exibir no trigger */}
                  {departmentsList.find((dep) => dep.id === departmentId)?.name}
                </SelectValue>
              </SelectTrigger>

              <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                {departmentsList.map((dep) => (
                  <SelectItem key={dep.id} value={dep.id}>
                    {dep.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-400">
              Nome do Serviço
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Formatação, Troca de Toner, Acesso à VPN..."
              className="bg-zinc-900 border-zinc-800 text-zinc-100"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-400">
              Descrição (Opcional)
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalhes ou pré-requisitos para este serviço..."
              rows={4}
              className="bg-zinc-900 border-zinc-800 text-zinc-100 resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800/80">
            <Button type="button" variant="ghost">
              <Link href="/services">Cancelar</Link>
            </Button>
            <Button
              type="submit"
              disabled={isPending || !name.trim() || !departmentId}
              className="bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Salvar Serviço"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
