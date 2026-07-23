import { ComponentProps } from "react";

interface LoginInputProps extends ComponentProps<"input"> {
  label: string;
  rightElement?: React.ReactNode;
}

export function LoginInput({
  label,
  rightElement,
  id,
  className = "",
  ...props
}: LoginInputProps) {
  return (
    <div className="space-y-1.5 text-left">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-medium text-zinc-400">
          {label}
        </label>
        {rightElement}
      </div>

      <input
        id={id}
        className={`w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800/80 rounded-xl text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...props}
      />
    </div>
  );
}
