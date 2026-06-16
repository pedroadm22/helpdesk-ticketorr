CREATE TABLE `prioridades_chamado` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nome` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `status_chamado` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nome` text NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_mensagens_chat` (
	`id` text PRIMARY KEY NOT NULL,
	`ticket_id` text NOT NULL,
	`remetente_id` text NOT NULL,
	`conteudo` text NOT NULL,
	`criado_em` integer NOT NULL,
	FOREIGN KEY (`ticket_id`) REFERENCES `tickets`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`remetente_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
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
	`status_id` integer DEFAULT 1 NOT NULL,
	`prioridade_id` integer NOT NULL,
	`data_limite_sla` integer NOT NULL,
	`data_criacao` integer NOT NULL,
	`data_atualizacao` integer NOT NULL,
	FOREIGN KEY (`cliente_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`status_id`) REFERENCES `status_chamado`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`prioridade_id`) REFERENCES `prioridades_chamado`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_tickets`("id", "protocolo", "titulo", "descricao", "cliente_id", "status_id", "prioridade_id", "data_limite_sla", "data_criacao", "data_atualizacao") SELECT "id", "protocolo", "titulo", "descricao", "cliente_id", "status_id", "prioridade_id", "data_limite_sla", "data_criacao", "data_atualizacao" FROM `tickets`;--> statement-breakpoint
DROP TABLE `tickets`;--> statement-breakpoint
ALTER TABLE `__new_tickets` RENAME TO `tickets`;--> statement-breakpoint
CREATE UNIQUE INDEX `tickets_protocolo_unique` ON `tickets` (`protocolo`);--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `data_criacao`;