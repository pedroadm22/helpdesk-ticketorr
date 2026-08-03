import { assignmentModeZodSchema } from "@/shared/types/domain/zod.types";
import { z } from "zod";

export const assignTicketSchema = z
  .object({
    ticketId: z.string().uuid("ID do chamado inválido."),
    technicianId: z.string().uuid("ID do técnico inválido.").nullable().optional(),
    mode: assignmentModeZodSchema.default("MANUAL"),
  })
  .superRefine((data, ctx) => {
    // Se o modo for MANUAL e nenhum técnico for informado
    if (data.mode === "MANUAL" && !data.technicianId) {
      ctx.addIssue({
        code: "custom",
        message: "Selecione um técnico para realizar a atribuição manual.",
        path: ["technicianId"],
      });
    }
  });

export type AssignTicketDTO = z.infer<typeof assignTicketSchema>;