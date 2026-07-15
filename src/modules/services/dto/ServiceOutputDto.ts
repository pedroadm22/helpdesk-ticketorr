import { createSelectSchema } from "drizzle-zod";
import { services } from "@/infrastructure/db/schema/services";
import { z } from "zod";

// Gera o schema de leitura com base no schema físico do Drizzle
export const serviceOutputSchema = createSelectSchema(services);

export type ServiceOutput = z.infer<typeof serviceOutputSchema>;