import React from "react";
import { MetricCard } from "@/components/ui/MetricCard";
import { Zap, Trophy, ShieldAlert } from "lucide-react";
import { Ticket } from "@/shared/types/domain/ticket";
import { UrgentAlerts } from "@/components/features/dashboard/AlertaUrgente";

// 1. Simulação da camada de serviço que busca dados direto do Banco de Dados
async function getDashboardAnalytics() {
  // Simulando um JOIN vindo do banco que traz apenas chamados "Abertos" com prioridade "Crítica"
  const chamadosCriticos: Ticket[] = [
    {
      id: "ticket-db-99",
      protocolo: "TK-2026-089",
      titulo: "Servidor de Produção fora do ar (Timeout na API)",
      descricao: "Aplicações travadas com erro 504 no Gateway de Autenticação.",
      clienteId: "user-zabbix",
      tecnicoId: null, // Sem técnico = Alerta na Home!
      statusId: 1, // Aberto
      prioridadeId: 4, // Crítica
      dataCriacao: new Date(),
      dataAtualizacao: new Date(),
      cliente: { 
        id: "user-zabbix", 
        nome: "Zabbix Infra", 
        email: "zabbix@empresa.com", 
        perfil: "TECNICO", 
        dataCriacao: new Date() 
      },
      status: { id: 1, nome: "Aberto", corHex: "#EF4444" },
      prioridade: { id: 4, nome: "Crítica", corHex: "#EF4444", tempoLimiteHoras: 1 }
    }
  ];

  return {
    chamadosCriticos,
    tempoMedioResolucao: "22 min",
    slaCumprido: "98.5%",
    chamadosHoje: 14
  };
}

// 2. O Componente da Página (Assíncrono por ser Server Component)
export default async function DashboardPage() {
  // Aguarda a resposta rápida do banco de dados antes de renderizar o HTML
  const { chamadosCriticos, tempoMedioResolucao, slaCumprido, chamadosHoje } = await getDashboardAnalytics();

  return (
    <div className="space-y-8">
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Dashboard Executivo</h1>
        <p className="text-sm text-zinc-400">Análise de performance em tempo real e alertas urgentes do sistema.</p>
      </div>

      {/* 📊 Grid de Métricas Globais (Reutilizando o MetricCard genérico) */}
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard 
          title="Tempo Médio de Resolução" 
          count={tempoMedioResolucao} 
          colorClass="text-blue-500" 
          icon={<Zap size={18} />} 
        />
        <MetricCard 
          title="SLA Dentro do Prazo" 
          count={slaCumprido} 
          colorClass="text-emerald-500" 
          icon={<Trophy size={18} />} 
        />
        <MetricCard 
          title="Tickets Criados Hoje" 
          count={chamadosHoje} 
          colorClass="text-zinc-400" 
          icon={<ShieldAlert size={18} />} 
        />
      </div>

      {/* 🚨 Seção de Atenção Imediata (Componente Local do Dashboard) */}
      {/* Passamos apenas a lista de chamados críticos filtrados pelo banco */}
      <UrgentAlerts tickets={chamadosCriticos} />

    </div>
  );
}