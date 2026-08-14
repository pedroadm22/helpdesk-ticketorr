// src/components/features/tickets/ticket-header-card.tsx
"use client";

import {
  User,
  Building2,
  Wrench,
  Clock,
  ShieldAlert,
  UserCheck,
  UserX,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/shared/utils/cn";

interface TicketHeaderCardProps {
  ticket: {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    createdAt: Date;
    clientName?: string;
    clientEmail?: string;
    serviceName?: string;
    departmentName?: string;
    agentName?: string;
  };
  currentUserRole: "ADMIN" | "TECHNICIAN" | "CLIENT";
}

const statusMap: Record<string, { label: string; color: string }> = {
  PENDING: { label: "Pendente", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  IN_PROGRESS: { label: "Em Andamento", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  WAITING_SUPPORT: { label: "Aguardando Suporte", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  FINISHED: { label: "Concluído", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  CLOSED: { label: "Fechado", color: "bg-zinc-800 text-zinc-400 border-zinc-700" },
};

const priorityMap: Record<string, { label: string; color: string }> = {
  LOW: { label: "Baixa", color: "text-zinc-400" },
  MEDIUM: { label: "Média", color: "text-amber-400" },
  HIGH: { label: "Alta", color: "text-orange-400 font-semibold" },
  URGENT: { label: "Urgente", color: "text-red-400 font-bold animate-pulse" },
};

export function TicketHeaderCard({ ticket }: TicketHeaderCardProps) {
  const status = statusMap[ticket.status] || { label: ticket.status, color: "bg-zinc-800 text-zinc-300" };
  const priority = priorityMap[ticket.priority] || { label: ticket.priority, color: "text-zinc-400" };

  return (
    <div className="space-y-4">
      {/* Botão de Voltar */}
      <Link
        href="/ticket"
        className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-emerald-400 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para a lista de chamados
      </Link>

      {/* Card Principal */}
      <div className="p-6 bg-zinc-950/80 border border-emerald-500/20 rounded-2xl shadow-xl backdrop-blur-xl space-y-6">
        {/* Cabeçalho de Status e Título */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs font-mono text-emerald-500 font-bold">
                #{ticket.id.slice(0, 8)}
              </span>
              <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", status.color)}>
                {status.label}
              </span>
            </div>
            <h1 className="text-xl font-bold text-zinc-100">{ticket.title}</h1>
          </div>

          <div className="flex items-center gap-2 text-xs bg-zinc-900/90 px-3 py-1.5 rounded-lg border border-zinc-800">
            <ShieldAlert className="h-4 w-4 text-zinc-400" />
            <span className="text-zinc-400">Prioridade:</span>
            <span className={priority.color}>{priority.label}</span>
          </div>
        </div>

        {/* Grid de Metadados (Solicitante, Setor, Serviço, Técnico) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Solicitante */}
          <div className="flex items-start gap-3 p-3 bg-zinc-900/40 rounded-xl border border-zinc-800/50">
            <User className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] text-zinc-500 uppercase font-semibold">Solicitante</p>
              <p className="text-sm font-medium text-zinc-200">{ticket.clientName || "Não informado"}</p>
              {ticket.clientEmail && (
                <p className="text-xs text-zinc-400 truncate">{ticket.clientEmail}</p>
              )}
            </div>
          </div>

          {/* Departamento / Setor */}
          <div className="flex items-start gap-3 p-3 bg-zinc-900/40 rounded-xl border border-zinc-800/50">
            <Building2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] text-zinc-500 uppercase font-semibold">Setor / Departamento</p>
              <p className="text-sm font-medium text-zinc-200">{ticket.departmentName || "Geral"}</p>
            </div>
          </div>

          {/* Serviço */}
          <div className="flex items-start gap-3 p-3 bg-zinc-900/40 rounded-xl border border-zinc-800/50">
            <Wrench className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] text-zinc-500 uppercase font-semibold">Serviço Solicitado</p>
              <p className="text-sm font-medium text-zinc-200">{ticket.serviceName || "Geral"}</p>
            </div>
          </div>

          {/* Técnico Atribuído */}
          <div className="flex items-start gap-3 p-3 bg-zinc-900/40 rounded-xl border border-zinc-800/50">
            {ticket.agentName ? (
              <UserCheck className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
            ) : (
              <UserX className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
            )}
            <div>
              <p className="text-[11px] text-zinc-500 uppercase font-semibold">Técnico Responsável</p>
              <p className="text-sm font-medium text-zinc-200">
                {ticket.agentName || "Aguardando Atribuição"}
              </p>
            </div>
          </div>
        </div>

        {/* Descrição Completa do Problema */}
        <div className="space-y-2 pt-2">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Descrição da Solicitação
          </h3>
          <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
            {ticket.description}
          </div>
        </div>
      </div>
    </div>
  );
}