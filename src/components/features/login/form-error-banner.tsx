interface FormErrorBannerProps {
  message: string | null;
}

export function FormErrorBanner({ message }: FormErrorBannerProps) {
  if (!message) return null;

  return (
    <div className="rounded-md bg-red-500/10 p-3 border border-red-500/20">
      <p className="text-xs text-red-400 font-medium text-center">
        {message}
      </p>
    </div>
  );
}