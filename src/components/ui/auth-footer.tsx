import Link from "next/link";

interface AuthFooterProps {
  text: string;
  linkText: string;
  href: string;
}

export function AuthFooter({ text, linkText, href }: AuthFooterProps) {
  return (
    <div className="text-center text-xs text-zinc-400 pt-2">
      {text}{" "}
      <Link
        href={href}
        className="font-medium text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors"
      >
        {linkText}
      </Link>
    </div>
  );
}