import { forwardRef, TextareaHTMLAttributes, useId } from "react";
import { cn } from "@/shared/utils/cn";
import { Label } from "./Label";
import { ErrorMessage } from "./ErrorMessage";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, rows = 4, ...props }, ref) => {
    const defaultId = useId();
    const textareaId = id || defaultId;
    const temErro = !!error;

    return (
      <div className="space-y-2 w-full">
        {label && <Label htmlFor={textareaId}>{label}</Label>}

        <textarea
          {...props}
          id={textareaId}
          ref={ref}
          rows={rows}
          aria-invalid={temErro ? "true" : "false"}
          aria-describedby={temErro ? `${textareaId}-error` : undefined}
          className={cn(
            "w-full rounded-lg border bg-zinc-900/50 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 resize-none",
            "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            temErro 
              ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/10" 
              : "border-zinc-800 focus:border-zinc-700"
          , className)}
        />

        <ErrorMessage id={`${textareaId}-error`} message={error} />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";