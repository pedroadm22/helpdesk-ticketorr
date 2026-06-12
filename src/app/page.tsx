import React from "react";
import { MetricCard } from "@/components/ui/MetricCard";
import { Zap, Trophy, ShieldAlert } from "lucide-react";
import { Ticket } from "@/shared/types/domain/ticket";
import { UrgentAlerts } from "@/components/features/dashboard/AlertaUrgente";
import { AnalyticGrid } from "@/components/ui/AnalyticGrid";

// 1. Simulação da camada de serviço que busca dados direto do Banco de Dados
async function getDashboardAnalytics() {
  return {
    totalChamados: 148,
    tempoMedioAtendimento: "26 min",
    siasEstourados: 3, // Vai acionar o alerta visual no card!
    taxaSatisfacao: "96.4%"
  };
}

// 2. O Componente da Página (Assíncrono por ser Server Component)
export default async function DashboardPage() {

  const analytics = await getDashboardAnalytics();
  // Aguarda a resposta rápida do banco de dados antes de renderizar o HTML

  return (
    <div className="space-y-8">
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Dashboard Executivo</h1>
        <p className="text-sm text-zinc-400">Análise de performance em tempo real e alertas urgentes do sistema.</p>
      </div>

      {/* 📊 Grid de Métricas Globais (Reutilizando o MetricCard genérico) */}
      <AnalyticGrid data={analytics} />

      {/* 🚨 Seção de Atenção Imediata (Componente Local do Dashboard) */}

    </div>
  );
}