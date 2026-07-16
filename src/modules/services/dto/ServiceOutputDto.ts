import { createSelectSchema } from "drizzle-zod";
import { services } from "@/infrastructure/db/schema/services";
import { z } from "zod";

export const serviceOutputSchema = createSelectSchema(services);

export type ServiceOutput = z.infer<typeof serviceOutputSchema>;