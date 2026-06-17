CREATE TABLE `mensagens_chat` (
	`id` text PRIMARY KEY NOT NULL,
	`ticket_id` text NOT NULL,
	`remetente_id` text NOT NULL,
	`conteudo` text NOT NULL,
	`criado_em` integer NOT NULL,
	FOREIGN KEY (`ticket_id`) REFERENCES `tickets`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`remetente_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
