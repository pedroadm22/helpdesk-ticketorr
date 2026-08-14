import { z } from "zod";

export const deleteUserSchema = z.object({
  id: z.string().uuid("ID de usuário inválido."),
});

export type DeleteUserDTO = z.infer<typeof deleteUserSchema>;