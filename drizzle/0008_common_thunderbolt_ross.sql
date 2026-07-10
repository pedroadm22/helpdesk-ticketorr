CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer DEFAULT false NOT NULL,
	`image` text,
	`role` text DEFAULT 'CLIENTE' NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_mensagens_chat` (
	`id` text PRIMARY KEY NOT NULL,
	`ticket_id` text NOT NULL,
	`remetente_id` text NOT NULL,
	`conteudo` text NOT NULL,
	`criado_em` integer NOT NULL,
	FOREIGN KEY (`ticket_id`) REFERENCES `tickets`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`remetente_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_mensagens_chat`("id", "ticket_id", "remetente_id", "conteudo", "criado_em") SELECT "id", "ticket_id", "remetente_id", "conteudo", "criado_em" FROM `mensagens_chat`;--> statement-breakpoint
DROP TABLE `mensagens_chat`;--> statement-breakpoint
ALTER TABLE `__new_mensagens_chat` RENAME TO `mensagens_chat`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_tickets` (
	`id` text PRIMARY KEY NOT NULL,
	`protocolo` text NOT NULL,
	`titulo` text NOT NULL,
	`descricao` text NOT NULL,
	`cliente_id` text NOT NULL,
	`tecnico_id` text,
	`status_id` integer DEFAULT 1 NOT NULL,
	`prioridade_id` integer NOT NULL,
	`data_limite_sla` integer NOT NULL,
	`data_creation` integer NOT NULL,
	`data_atualizacao` integer NOT NULL,
	FOREIGN KEY (`cliente_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tecnico_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`status_id`) REFERENCES `status_chamado`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`prioridade_id`) REFERENCES `prioridades_chamado`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_tickets`("id", "protocolo", "titulo", "descricao", "cliente_id", "tecnico_id", "status_id", "prioridade_id", "data_limite_sla", "data_creation", "data_atualizacao") SELECT "id", "protocolo", "titulo", "descricao", "cliente_id", "tecnico_id", "status_id", "prioridade_id", "data_limite_sla", "data_creation", "data_atualizacao" FROM `tickets`;--> statement-breakpoint
DROP TABLE `tickets`;--> statement-breakpoint
ALTER TABLE `__new_tickets` RENAME TO `tickets`;--> statement-breakpoint
CREATE UNIQUE INDEX `tickets_protocolo_unique` ON `tickets` (`protocolo`);--> statement-breakpoint
ALTER TABLE `prioridades_chamado` ADD `name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `prioridades_chamado` DROP COLUMN `nome`;--> statement-breakpoint
ALTER TABLE `status_chamado` ADD `name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `status_chamado` DROP COLUMN `nome`;