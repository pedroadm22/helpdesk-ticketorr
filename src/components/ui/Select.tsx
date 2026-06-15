import { forwardRef, SelectHTMLAttributes, useId } from "react";
import { cn } from "@/shared/utils/cn";
import { Label } from "./Label";
import { ErrorMessage } from "./ErrorMessage";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, children, className, id, ...props }, ref) => {
    const defaultId = useId();
    const selectId = id || defaultId;
    const temErro = !!error;

    return (
      <div className="space-y-2 w-full">
        {label && <Label htmlFor={selectId}>{label}</Label>}

        <select
          {...props}
          id={selectId}
          ref={ref}
          aria-invalid={temErro ? "true" : "false"}
          aria-describedby={temErro ? `${selectId}-error` : undefined}
          className={cn(
            "w-full rounded-lg border bg-zinc-900/50 px-3.5 py-2.5 text-sm text-zinc-100 cursor-pointer",
            "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            temErro 
              ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/10" 
              : "border-zinc-800 focus:border-zinc-700"
          , className)}
        >
          {children}
        </select>

        <ErrorMessage id={`${selectId}-error`} message={error} />
      </div>
    );
  }
);
Select.displayName = "Select";