import { ALL_TICKET_STATUSES } from "@/shared/domain/types/ticket-status.type";
import { pgEnum } from "drizzle-orm/pg-core";

export const ticketStatusEnum = pgEnum("ticket_status", ALL_TICKET_STATUSES);