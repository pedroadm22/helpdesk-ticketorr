// src/modules/auth/repositories/drizzle-auth.repository.ts
import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { socketSessions } from "@/infrastructure/db/schema";
import type { IAuthRepository, UserSocketSession } from "./auth.repository.interface";

export const drizzleAuthRepository: IAuthRepository = {
  saveSocketSession: async (session: UserSocketSession): Promise<void> => {
    await db.insert(socketSessions).values({
      socketId: session.socketId,
      userId: session.userId,
      connectedAt: session.connectedAt,
    }).onConflictDoUpdate({
      target: socketSessions.socketId,
      set: { userId: session.userId, connectedAt: session.connectedAt },
    });
  },

  removeSocketSession: async (socketId: string): Promise<void> => {
    await db.delete(socketSessions).where(eq(socketSessions.socketId, socketId));
  },

  findSocketsByUserId: async (userId: string): Promise<string[]> => {
    const sessions = await db.query.socketSessions.findMany({
      where: (s, { eq }) => eq(s.userId, userId),
    });

    return sessions.map((s) => s.socketId);
  },
};