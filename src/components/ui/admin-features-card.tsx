"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface ItemSummary {
  id: string;
  title: string;
  subtitle?: string;
}

interface AdminFeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode; // 👈 Mudança aqui: de LucideIcon para React.ReactNode
  count: number;
  recentItems: ItemSummary[];
  emptyMessage?: string;
  actionButton: React.ReactNode;
}

export function AdminFeatureCard({
  title,
  description,
  icon,
  count,
  recentItems,
  emptyMessage = "Nenhum item cadastrado.",
  actionButton,
}: AdminFeatureCardProps) {
  return (
    <Card className="flex flex-col justify-between hover:border-primary/50 transition-all">
      <div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div className="space-y-1">
            <CardTitle className="text-xl flex items-center gap-2">
              {icon} {/* 👈 Renderiza o ícone direto */}
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <span className="text-2xl font-bold text-primary">{count}</span>
        </CardHeader>

        <CardContent className="space-y-3">
          {recentItems.length === 0 ? (
            <p className="text-xs text-muted-foreground py-3 text-center border border-dashed rounded-md">
              {emptyMessage}
            </p>
          ) : (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Recentes
              </span>
              <ul className="space-y-1.5">
                {recentItems.slice(0, 3).map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between text-sm p-2 rounded-md bg-muted/40"
                  >
                    <span className="font-medium truncate">{item.title}</span>
                    {item.subtitle && (
                      <span className="text-xs text-muted-foreground">
                        {item.subtitle}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </div>

      <CardFooter className="pt-2">{actionButton}</CardFooter>
    </Card>
  );
}