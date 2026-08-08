import { TICKET_STATUSES } from "@/shared/types/domain/ticket-status.type";
import { pgEnum } from "drizzle-orm/pg-core";

export const ticketStatusEnum = pgEnum("ticket_status", TICKET_STATUSES);