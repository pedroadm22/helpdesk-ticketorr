// src/shared/types/better-auth.d.ts
import { UserRole } from "./domain/user";

declare module "better-auth" {
  interface User {
    role: UserRole; // 🌟 Diz ao Better Auth que 'role' não é uma string qualquer, é o nosso type!
  }
}