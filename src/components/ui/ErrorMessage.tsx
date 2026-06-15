import { HTMLAttributes } from "react";
import { cn } from "@/shared/utils/cn";

interface ErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  message?: string;
}

export function ErrorMessage({ message, className, ...props }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <p
      {...props}
      className={cn(
        "text-xs text-red-400 font-medium animate-in fade-in slide-in-from-top-1 duration-200",
        className
      )}
    >
      {message}
    </p>
  );
}