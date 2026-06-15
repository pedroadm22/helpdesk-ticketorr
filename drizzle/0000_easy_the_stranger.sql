CREATE TABLE `tenant_config` (
	`id` text PRIMARY KEY NOT NULL,
	`tenant_id` text NOT NULL,
	`protocolo_template` text DEFAULT '{PREFIXO}-{ANO}-{NUMERO}',
	`protocolo_prefixo` text DEFAULT 'TK',
	`protocolo_digitos` integer DEFAULT 3
);
--> statement-breakpoint
CREATE TABLE `tickets` (
	`id` text PRIMARY KEY NOT NULL,
	`protocolo` text NOT NULL,
	`titulo` text NOT NULL,
	`descricao` text NOT NULL,
	`cliente_id` text NOT NULL,
	`tecnico_id` text,
	`status_id` integer DEFAULT 1 NOT NULL,
	`prioridade_id` integer DEFAULT 1 NOT NULL,
	`data_criacao` integer NOT NULL,
	`data_atualizacao` integer NOT NULL,
	FOREIGN KEY (`cliente_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tecnico_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tickets_protocolo_unique` ON `tickets` (`protocolo`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`nome` text NOT NULL,
	`email` text NOT NULL,
	`perfil` text NOT NULL,
	`data_criacao` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);