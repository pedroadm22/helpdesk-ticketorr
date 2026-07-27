import { createSelectSchema } from "drizzle-zod";
import { users } from "@/infrastructure/db/schema/auth";
import { z } from "zod";

// Usamos o schema da tabela física de usuários como base
export const sessionUserSchema = createSelectSchema(users).pick({
  id: true,
  name: true,
  email: true,
  image: true,
  role: true, // 🌟 Muito importante para sabermos se é CLIENT, TECHNICIAN ou ADMIN
});

export type SessionUser = z.infer<typeof sessionUserSchema>;