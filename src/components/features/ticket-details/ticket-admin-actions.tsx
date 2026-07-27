// src/components/features/tickets/ticket-admin-actions.tsx
"use client";

import { useState, useTransition } from "react";
import { UserCheck, ShieldAlert, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { assignTicketAction } from "@/actions/tickets/assign-ticket.action";

export interface TechnicianOption {
  id: string;
  name: string;
  email?: string | null;
}

interface TicketAdminActionsProps {
  ticketId: string;
  currentAgentId: string | null;
  techniciansList?: TechnicianOption[];
}

export function TicketAdminActions({
  ticketId,
  currentAgentId,
  techniciansList = [],
}: TicketAdminActionsProps) {
  const [selectedAgentId, setSelectedAgentId] = useState<string>(
    currentAgentId ?? ""
  );
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleAssign = () => {
    if (!selectedAgentId || selectedAgentId === currentAgentId) return;

    setFeedback(null);
    startTransition(async () => {
      const res = await assignTicketAction({
        ticketId,
        agentId: selectedAgentId,
      });

      if (res.success) {
        setFeedback({
          type: "success",
          message: "Chamado encaminhado com sucesso!",
        });
      } else {
        setFeedback({
          type: "error",
          message: res.error || "Erro ao encaminhar chamado.",
        });
      }
    });
  };

  return (
    <div className="p-4 bg-zinc-950/90 border border-amber-500/30 rounded-2xl shadow-lg backdrop-blur-xl space-y-3">
      <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
        <ShieldAlert className="h-4 w-4 text-amber-400" />
        Ações do Administrador — Triagem e Encaminhamento
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Dropdown para selecionar o técnico */}
        <div className="flex-1">
          <Select
            value={selectedAgentId}
            onValueChange={(val) => setSelectedAgentId(val ?? "")}
          >
            <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-100 focus:ring-amber-500/40 h-10 w-full">
              <SelectValue placeholder="Selecione um técnico para atender..." />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100 z-50">
              {techniciansList.length === 0 ? (
                <div className="p-3 text-xs text-zinc-500">
                  Nenhum técnico cadastrado
                </div>
              ) : (
                techniciansList.map((tech) => (
                  <SelectItem
                    key={tech.id}
                    value={tech.id}
                    className="cursor-pointer hover:bg-zinc-800 text-zinc-200"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{tech.name}</span>
                      {tech.email && (
                        <span className="text-xs text-zinc-500">
                          ({tech.email})
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Botão de Encaminhar */}
        <Button
          onClick={handleAssign}
          disabled={
            isPending ||
            !selectedAgentId ||
            selectedAgentId === currentAgentId ||
            techniciansList.length === 0
          }
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium h-10 px-5 gap-2 cursor-pointer disabled:opacity-40 transition-all shrink-0"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <UserCheck className="h-4 w-4" />
          )}
          {currentAgentId ? "Reatribuir Técnico" : "Encaminhar Chamado"}
        </Button>
      </div>

      {/* Mensagem de Feedback */}
      {feedback && (
        <div
          className={`p-2.5 rounded-lg text-xs flex items-center gap-2 border ${
            feedback.type === "success"
              ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
              : "bg-red-950/40 border-red-500/30 text-red-300"
          }`}
        >
          {feedback.type === "success" && (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          )}
          {feedback.message}
        </div>
      )}
    </div>
  );
}