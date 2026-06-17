// src/components/features/chamados/CriarTicketForm.tsx
"use client";

import { AlertCircle, Loader2, Send } from "lucide-react";
import { useCriarTicketForm } from "@/hooks/useCriarTicketForm";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/TextArea";

export function CriarTicketForm() {
  const { loading, errosCampos, erroGeral, onSubmit, onCancel } = useCriarTicketForm();

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Mensagem de Erro Global (Tratamento de Falhas Críticas/Servidor) */}
      {erroGeral && (
        <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400 animate-in fade-in duration-200">
          <AlertCircle size={18} className="shrink-0" />
          <span>{erroGeral}</span>
        </div>
      )}

      {/* Campo de Título */}
      <Input
        label="Título / Assunto"
        id="titulo"
        name="titulo"
        disabled={loading}
        error={errosCampos.titulo?.[0]} // Injeta diretamente a primeira string de erro mapeada pelo Zod
        placeholder="Ex: Instabilidade no Zabbix ou Evolution API"
      />

      {/* Campo de Seleção de Prioridade / Urgência */}
      <Select
        label="Nível de Urgência"
        id="prioridadeId"
        name="prioridadeId"
        disabled={loading}
        error={errosCampos.prioridadeId?.[0]}
      >
        <option value="1" className="bg-zinc-950 text-zinc-300">🟢 Baixa (Suporte Geral - até 48h)</option>
        <option value="2" className="bg-zinc-950 text-zinc-300">🔵 Média (Ajustes Operacionais - até 24h)</option>
        <option value="3" className="bg-zinc-950 text-zinc-300">🟡 Alta (Bloqueio Parcial - até 8h)</option>
        <option value="4" className="bg-zinc-950 text-zinc-300">🔴 Crítica (Monitoramento Offline / Queda - até 2h)</option>
      </Select>

      {/* Campo de Descrição Detalhada */}
      <Textarea
        label="Descrição do Problema"
        id="descricao"
        name="descricao"
        rows={5}
        disabled={loading}
        error={errosCampos.descricao?.[0]}
        placeholder="Forneça o máximo de detalhes, logs ou comportamento do erro observado..."
      />

      {/* Barra de Ações Inferior */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          disabled={loading}
          onClick={onCancel}
          className="rounded-lg border border-zinc-800 bg-zinc-900/20 px-4 py-2.5 text-sm font-medium text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancelar
        </button>
        
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-all duration-200 shadow-lg shadow-blue-600/10 active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed min-w-[140px]"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Salvando...</span>
            </>
          ) : (
            <>
              <Send size={16} />
              <span>Criar Chamado</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}