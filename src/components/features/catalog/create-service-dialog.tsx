"use client";

import { useState } from "react";
import { Plus, Wrench, Loader2 } from "lucide-react";

import { cn } from "@/shared/utils/cn";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCreateServiceForm } from "@/hooks/use-create-service";

interface DepartmentOption {
  id: string;
  name: string;
}

interface CreateServiceDialogProps {
  departmentsList: DepartmentOption[];
}

export function CreateServiceDialog({
  departmentsList,
}: CreateServiceDialogProps) {
  const [open, setOpen] = useState(false);

  // Importa a lógica encapsulada do Hook
  const { formState, formActions } = useCreateServiceForm({
    onSuccess: () => setOpen(false),
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) formActions.resetForm(); // Limpa erros e estados ao fechar
      }}
    >
      <DialogTrigger>
        <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-md shadow-emerald-950/40 gap-2 cursor-pointer transition-all">
          <Plus className="h-4 w-4" />
          Novo Serviço
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-zinc-950/90 backdrop-blur-2xl border-emerald-500/20 text-zinc-100 shadow-2xl shadow-emerald-950/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-emerald-400 text-lg font-bold">
            <Wrench className="h-5 w-5 text-emerald-400" />
            Criar Serviço
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Cadastre um tipo de solicitação vinculada a um departamento.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formActions.handleSubmit} className="space-y-4 py-2">
          {formState.errorMessage && (
            <div className="p-3 text-xs rounded-md bg-red-950/40 border border-red-500/30 text-red-300">
              {formState.errorMessage}
            </div>
          )}

          {/* Seleção do Departamento */}
          <div className="space-y-2">
            <Label
              htmlFor="service-dept"
              className="text-zinc-300 text-xs font-semibold uppercase tracking-wider"
            >
              Departamento *
            </Label>
            <Select
              value={formState.departmentId}
              onValueChange={formActions.setDepartmentId}
            >
              <SelectTrigger
                id="service-dept"
                className="bg-zinc-900 border-emerald-500/30 text-zinc-100 focus:ring-emerald-500/50 h-10"
              >
                <SelectValue placeholder="Selecione um departamento...">
                  {/* Força a exibição do nome do departamento selecionado */}
                  {
                    departmentsList.find(
                      (dept) =>
                        String(dept.id) === String(formState.departmentId),
                    )?.name
                  }
                </SelectValue>
              </SelectTrigger>

              <SelectContent className="bg-zinc-900 border-emerald-500/30 text-zinc-100 shadow-2xl z-50">
                {departmentsList.map((dept) => (
                  <SelectItem
                    key={dept.id}
                    value={String(dept.id)}
                    className={cn(
                      "cursor-pointer text-zinc-200 transition-colors py-2 px-3",
                      "data-[highlighted]:bg-emerald-600 data-[highlighted]:text-white font-medium",
                      "data-[state=checked]:bg-emerald-700 data-[state=checked]:text-white",
                    )}
                  >
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Nome do Serviço */}
          <div className="space-y-2">
            <Label
              htmlFor="service-name"
              className="text-zinc-300 text-xs font-semibold uppercase tracking-wider"
            >
              Nome do Serviço *
            </Label>
            <Input
              id="service-name"
              placeholder="Ex: Troca de Monitor, Reset de Senha"
              value={formState.name}
              onChange={(e) => formActions.setName(e.target.value)}
              required
              className="bg-zinc-900/80 border-emerald-500/20 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40"
            />
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label
              htmlFor="service-desc"
              className="text-zinc-300 text-xs font-semibold uppercase tracking-wider"
            >
              Descrição (Opcional)
            </Label>
            <Textarea
              id="service-desc"
              placeholder="Descreva a finalidade ou requisitos deste serviço..."
              value={formState.description}
              onChange={(e) => formActions.setDescription(e.target.value)}
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
              disabled={formState.isPending}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium gap-2 cursor-pointer"
            >
              {formState.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Salvar Serviço
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
