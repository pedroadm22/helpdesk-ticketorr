import { ALL_TICKET_PRIORITIES } from "@/shared/domain/types/ticket-priority.type";
import { pgEnum } from "drizzle-orm/pg-core";

export const ticketPriorityEnum = pgEnum("ticket_priority", ALL_TICKET_PRIORITIES);