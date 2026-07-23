interface FormErrorProps {
  message?: string | null;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="rounded-md bg-red-500/10 p-3 border border-red-500/20 text-center">
      <p className="text-xs text-red-400 font-medium">{message}</p>
    </div>
  );
}