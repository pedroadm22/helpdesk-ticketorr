import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface LoginCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function LoginCard({
  title,
  description,
  children,
  footer,
}: LoginCardProps) {
  return (
    <Card className="w-full max-w-md bg-zinc-900/90 border-zinc-800/80 backdrop-blur-md shadow-2xl">
      <CardHeader className="text-center space-y-1.5">
        <CardTitle className="text-2xl font-bold tracking-tight text-zinc-100">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-zinc-400">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent>{children}</CardContent>

      {footer && (
        <CardFooter className="justify-center border-t border-zinc-800/60 pt-6 text-xs text-zinc-400">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}