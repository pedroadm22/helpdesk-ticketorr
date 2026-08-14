// src/components/features/tickets/create-ticket-dialog.tsx
"use client";

import { useState } from "react";
import { Plus, Ticket, Building2, Loader2 } from "lucide-react";

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

import {
  useCreateTicket,
  ServiceOption,
} from "@/hooks/use-create-ticket";

export interface CreateTicketDialogProps {
  servicesList: ServiceOption[];
}

export function CreateTicketDialog({ servicesList = [] }: CreateTicketDialogProps) {
  const [open, setOpen] = useState(false);

  const { formState, formActions } = useCreateTicket({
    servicesList,
    onSuccess: () => setOpen(false),
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) formActions.resetForm();
      }}
    >
      <DialogTrigger>
        <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-md shadow-emerald-950/40 gap-2 cursor-pointer transition-all">
          <Plus className="h-4 w-4" />
          Abrir Chamado
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px] bg-zinc-950/90 backdrop-blur-2xl border-emerald-500/20 text-zinc-100 shadow-2xl shadow-emerald-950/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-emerald-400 text-lg font-bold">
            <Ticket className="h-5 w-5 text-emerald-400" />
            Novo Chamado
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Selecione o serviço desejado e descreva sua solicitação.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formActions.handleSubmit} className="space-y-4 py-2">
          {formState.errorMessage && (
            <div className="p-3 text-xs rounded-md bg-red-950/40 border border-red-500/30 text-red-300">
              {formState.errorMessage}
            </div>
          )}

          {/* 1. Seleção do Serviço */}
          <div className="space-y-2">
            <Label htmlFor="ticket-service" className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">
              Serviço Solicitado *
            </Label>
            
            {servicesList.length === 0 ? (
              <div className="p-3 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-amber-400/90">
                Nenhum serviço cadastrado no sistema no momento.
              </div>
            ) : (
              <Select
                value={formState.serviceId}
                onValueChange={formActions.setServiceId}
              >
                <SelectTrigger
                  id="ticket-service"
                  className="bg-zinc-900 border-emerald-500/30 text-zinc-100 focus:ring-emerald-500/50 h-10"
                >
                  <SelectValue placeholder="Selecione um serviço...">
                    {servicesList.find((srv) => String(srv.id) === String(formState.serviceId))?.name}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent className="bg-zinc-900 border-emerald-500/30 text-zinc-100 shadow-2xl z-50 max-h-60">
                  {servicesList.map((srv) => (
                    <SelectItem
                      key={srv.id}
                      value={String(srv.id)}
                      className={cn(
                        "cursor-pointer text-zinc-200 transition-colors py-2 px-3",
                        "data-[highlighted]:bg-emerald-600 data-[highlighted]:text-white font-medium",
                        "data-[state=checked]:bg-emerald-700 data-[state=checked]:text-white"
                      )}
                    >
                      {srv.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* 2. Setor / Departamento (Exibição Automática) */}
          <div className="space-y-2">
            <Label htmlFor="ticket-dept" className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">
              Setor Responsável
            </Label>
            <div className="relative flex items-center">
              <Building2 className="absolute left-3 h-4 w-4 text-emerald-500/70" />
              <Input
                id="ticket-dept"
                readOnly
                value={formState.selectedService?.departmentName || "Selecione um serviço acima"}
                className="pl-9 bg-zinc-900/50 border-emerald-500/10 text-zinc-400 cursor-not-allowed focus-visible:ring-0 font-medium select-none"
              />
            </div>
          </div>

          {/* 3. Descrição do Problema */}
          <div className="space-y-2">
            <Label htmlFor="ticket-desc" className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">
              Descrição do Problema *
            </Label>
            <Textarea
              id="ticket-desc"
              placeholder="Descreva detalhadamente o que está acontecendo ou o que você precisa..."
              value={formState.description}
              onChange={(e) => formActions.setDescription(e.target.value)}
              rows={4}
              required
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
              disabled={formState.isPending || servicesList.length === 0}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium gap-2 cursor-pointer disabled:opacity-50"
            >
              {formState.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Enviar Chamado
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}