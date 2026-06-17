import { forwardRef, InputHTMLAttributes, useId } from "react";
import { cn } from "@/shared/utils/cn";
import { Label } from "./Label";
import { ErrorMessage } from "./ErrorMessage";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, type = "text", ...props }, ref) => {
    const defaultId = useId();
    const inputId = id || defaultId;
    const temErro = !!error;

    return (
      <div className="space-y-2 w-full">
        {label && <Label htmlFor={inputId}>{label}</Label>}
        
        <input
          {...props}
          id={inputId}
          type={type}
          ref={ref}
          aria-invalid={temErro ? "true" : "false"}
          aria-describedby={temErro ? `${inputId}-error` : undefined}
          className={cn(
            "w-full rounded-lg border bg-zinc-900/50 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500",
            "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            temErro 
              ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/10" 
              : "border-zinc-800 focus:border-zinc-700"
          , className)}
        />

        <ErrorMessage id={`${inputId}-error`} message={error} />
      </div>
    );
  }
);
Input.displayName = "Input";