// src/config/navigation.config.ts
import {
  Ticket,
  LayoutDashboard,
  Users,
  Wrench,
  Building2,
  LucideIcon,
} from "lucide-react";

export type UserRole = "CLIENT" | "TECHNICIAN" | "ADMIN";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  roles: UserRole[]; // Quais perfis têm permissão de ver esse link
}

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["TECHNICIAN", "ADMIN"], // Oculto para CLIENT
  },
  {
    title: "Chamados",
    href: "/ticket",
    icon: Ticket,
    roles: ["CLIENT", "TECHNICIAN", "ADMIN"], // Visível para TODOS
  },
  {
    title: "Serviços",
    href: "/services",
    icon: Wrench,
    roles: ["ADMIN"], // Exclusivo ADMIN
  },
  {
    title: "Departamentos",
    href: "/departments",
    icon: Building2,
    roles: ["ADMIN"], // Exclusivo ADMIN
  },
  {
    title: "Usuários",
    href: "/users",
    icon: Users,
    roles: ["ADMIN"], // Exclusivo ADMIN
  },
];