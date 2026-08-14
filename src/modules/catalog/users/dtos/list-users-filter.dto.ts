import { z } from "zod";
import { userRoleZodSchema } from "@/shared/types/domain/zod.types";

export const listUsersFilterSchema = z.object({
  role: userRoleZodSchema.optional(),
  departmentId: z.string().uuid().optional(),
  search: z.string().optional(), // Busca por nome ou e-mail
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

export type ListUsersFilterDTO = z.infer<typeof listUsersFilterSchema>;