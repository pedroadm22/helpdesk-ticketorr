"use client";

import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export interface FormUnderlineInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
}

export const FormUnderlineInput = React.forwardRef<
  HTMLInputElement,
  FormUnderlineInputProps
>(({ className, type, icon: Icon, ...props }, ref) => {
  return (
    <div className="relative border-b border-zinc-700 focus-within:border-emerald-500 transition-colors pb-1">
      <input
        type={type}
        className={cn(
          "w-full bg-transparent pr-10 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
      {Icon && (
        <Icon className="absolute right-2 top-2.5 h-4 w-4 text-zinc-400 pointer-events-none" />
      )}
    </div>
  );
});

FormUnderlineInput.displayName = "FormUnderlineInput";