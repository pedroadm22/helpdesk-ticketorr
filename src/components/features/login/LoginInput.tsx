import { ComponentProps } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/shared/utils/cn";

interface LoginInputProps extends ComponentProps<typeof Input> {
  label: string;
  rightElement?: React.ReactNode;
}

export function LoginInput({
  label,
  rightElement,
  id,
  className,
  ...props
}: LoginInputProps) {
  return (
    <div className="space-y-2 text-left">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-xs font-medium text-zinc-400">
          {label}
        </Label>
        {rightElement}
      </div>

      <Input
        id={id}
        className={cn(
          // Força fundo escuro, texto claro e placeholder bem visível
          "bg-zinc-950 text-zinc-100 placeholder:text-zinc-500 border-zinc-800",
          "focus-visible:ring-blue-500/30 focus-visible:border-blue-500/50",
          // Previne o fundo branco/amarelo do autofill do Chrome/Edge
          "[&:-webkit-autofill]:bg-zinc-950 [&:-webkit-autofill]:[ -webkit-text-fill-color:#f4f4f5] [&:-webkit-autofill]:[transition:background-color_5000s_ease-in-out_0s]",
          className
        )}
        {...props}
      />
    </div>
  );
}