import { db } from "@/infrastructure/db";
import { chatMessages, users } from "@/infrastructure/db/schema"; // Ajuste o import do schema se necessário
import { eq } from "drizzle-orm";

export const chatRepository = {
  // Salva a mensagem no banco utilizando userId conforme o seu schema
  async saveMessage(data: { ticketId: string; remetenteId: string; conteudo: string }) {
    const [created] = await db
      .insert(chatMessages)
      .values({
        ticketId: data.ticketId,
        userId: data.remetenteId, // Mapeado para userId da tabela chatMessages
        content: data.conteudo,
      })
      .returning();

    return created;
  },

  // Busca o usuário para validação no handshake do Socket
  async findUserForSocket(userId: string) {
    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        role: users.role,
      })
      .from(users)
      .where(eq(users.id, userId));

    return user || null;
  },
};