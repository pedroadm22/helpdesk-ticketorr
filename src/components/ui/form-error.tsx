// src/components/ui/form-error.tsx
import { AlertTriangle } from "lucide-react";

interface FormErrorProps {
  message?: string | null;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
      <AlertTriangle className="h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}