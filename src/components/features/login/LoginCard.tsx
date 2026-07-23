import { ReactNode } from "react";

interface LoginCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function LoginCard({
  title,
  description,
  children,
  footer,
}: LoginCardProps) {
  return (
    <div className="w-full max-w-md p-8 bg-zinc-900/90 border border-zinc-800/80 rounded-2xl shadow-2xl backdrop-blur-md">
      {/* Cabeçalho do Card */}
      <div className="mb-6 text-center space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-zinc-400">{description}</p>
        )}
      </div>

      {/* Conteúdo Principal (Formulário) */}
      <div>{children}</div>

      {/* Rodapé opcional */}
      {footer && (
        <div className="mt-6 pt-6 border-t border-zinc-800/60 text-center text-xs text-zinc-400">
          {footer}
        </div>
      )}
    </div>
  );
}