import { createSelectSchema } from "drizzle-zod";
import { tickets } from "@/infrastructure/db/schema/tickets";
import { z } from "zod";

export const ticketOutputSchema = createSelectSchema(tickets);

export type TicketOutput = z.infer<typeof ticketOutputSchema>;