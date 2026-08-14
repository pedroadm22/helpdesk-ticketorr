CREATE TYPE "public"."service_priority" AS ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT');--> statement-breakpoint
CREATE TYPE "public"."assignment_mode" AS ENUM('MANUAL', 'WORKLOAD_BALANCED');--> statement-breakpoint
CREATE TYPE "public"."assignment_state" AS ENUM('ALL', 'ASSIGNED', 'UNASSIGNED');--> statement-breakpoint
ALTER TYPE "public"."ticket_status" ADD VALUE 'OPEN' BEFORE 'WAITING_SUPPORT';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "image" SET DEFAULT 'https://ui-avatars.com/api/?name=User&background=random';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "image" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "department_id" uuid;--> statement-breakpoint
ALTER TABLE "services" ADD COLUMN "service_priority" "service_priority" DEFAULT 'LOW' NOT NULL;--> statement-breakpoint
ALTER TABLE "services" ADD COLUMN "sla_hours" integer DEFAULT 24 NOT NULL;--> statement-breakpoint
ALTER TABLE "services" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "chat_messages" ADD COLUMN "is_internal" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "chat_messages" ADD COLUMN "attachments" jsonb;--> statement-breakpoint
ALTER TABLE "chat_messages" ADD COLUMN "read_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "chat_messages" ADD COLUMN "edited_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_ticket_id_tickets_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "public"."tickets"("id") ON DELETE cascade ON UPDATE no action;