// faqs/repositories/faq.repository.ts
import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/db"; // Ajuste para o seu caminho de conexão
import { faqs } from "@/infrastructure/db/schema"; // Ajuste para o seu caminho do schema
import { IFaqRepository, FaqEntity, FaqInsert } from "./faq-repository-interface";

export class FaqRepository implements IFaqRepository {
  async create(data: FaqInsert): Promise<FaqEntity> {
    const [newFaq] = await db.insert(faqs).values(data).returning();
    return newFaq;
  }

  async findById(id: string): Promise<FaqEntity | null> {
    const [faq] = await db.select().from(faqs).where(eq(faqs.id, id));
    return faq || null;
  }

  async update(id: string, data: Partial<FaqInsert>): Promise<FaqEntity | null> {
    const [updatedFaq] = await db.update(faqs).set(data).where(eq(faqs.id, id)).returning();
    return updatedFaq || null;
  }
}