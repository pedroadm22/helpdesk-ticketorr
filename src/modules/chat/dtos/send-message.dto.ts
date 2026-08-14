// src/modules/chat/dtos/send-chat-message.dto.ts
import { z } from "zod";

export const sendChatMessageSchema = z
  .object({
    ticketId: z.uuid("ID do ticket inválido"),
    userId: z.uuid("ID do usuário inválido"),
    content: z.string().trim().min(1, "A mensagem não pode estar vazia"),
    isInternal: z.boolean().optional().default(false),
    attachments: z
      .array(
        z.object({
          name: z.string(),
          url: z.url("URL de anexo inválida"),
          type: z.string(),
          size: z.number().positive(),
        }),
      )
      .optional(),
  })
  .refine(
    (data) =>
      data.content.trim().length > 0 ||
      (data.attachments && data.attachments.length > 0),
    {
      message: "A mensagem não pode ser enviada vazia sem um anexo.",
      path: ["content"],
    },
  );

export type SendChatMessageDTO = z.infer<typeof sendChatMessageSchema>;
