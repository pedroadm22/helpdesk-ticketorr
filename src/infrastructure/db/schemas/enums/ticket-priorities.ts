import { TICKET_PRIORITIES } from "@/shared/types/domain/ticket-priority.type";
import { pgEnum } from "drizzle-orm/pg-core";

export const ticketPriorityEnum = pgEnum("ticket_priority", TICKET_PRIORITIES);