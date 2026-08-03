import { z } from "zod";

export const listServicesFilterSchema = z.object({
  search: z.string().optional(),
  departmentId: z.string().uuid().optional(),
  isActive: z
    .preprocess((val) => {
      if (val === "true") return true;
      if (val === "false") return false;
      return val;
    }, z.boolean())
    .optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
});

export type ListServicesFilterDTO = z.infer<typeof listServicesFilterSchema>;