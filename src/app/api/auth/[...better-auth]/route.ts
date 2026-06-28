import { auth } from "@/infrastructure/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Captura todas as requisições (sign-in, sign-out, session) e repassa ao Better Auth
export const { GET, POST } = toNextJsHandler(auth);