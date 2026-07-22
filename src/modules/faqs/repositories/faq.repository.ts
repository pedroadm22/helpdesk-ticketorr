import { eq, and } from "drizzle-orm";
import { db } from "@/infrastructure/db"; // Ajuste para o caminho da sua conexão
import { faqs } from "@/infrastructure/db/schema/faqs";
import {
  IFaqRepository,
  FaqEntity,
  FaqInsert,
} from "./faq.repository.interface";

export class FaqRepository implements IFaqRepository {
  async create(data: FaqInsert): Promise<FaqEntity> {
    const [inserted] = await db.insert(faqs).values(data).returning();

    if (!inserted) {
      throw new Error("Erro ao criar o FAQ no banco de dados.");
    }

    return inserted;
  }

  async findById(id: string): Promise<FaqEntity | null> {
    const [faq] = await db
      .select()
      .from(faqs)
      .where(eq(faqs.id, id));

    return faq || null;
  }

  async findBySlug(slug: string): Promise<FaqEntity | null> {
    const [faq] = await db
      .select()
      .from(faqs)
      .where(eq(faqs.slug, slug));

    return faq || null;
  }

  async findAll(onlyActive = false): Promise<FaqEntity[]> {
    if (onlyActive) {
      return await db
        .select()
        .from(faqs)
        .where(eq(faqs.isActive, true));
    }

    return await db.select().from(faqs);
  }

  async findByDepartmentId(departmentId: string): Promise<FaqEntity[]> {
    return await db
      .select()
      .from(faqs)
      .where(
        and(
          eq(faqs.departmentId, departmentId),
          eq(faqs.isActive, true)
        )
      );
  }

  async findByServiceId(serviceId: string): Promise<FaqEntity[]> {
    return await db
      .select()
      .from(faqs)
      .where(
        and(
          eq(faqs.serviceId, serviceId),
          eq(faqs.isActive, true)
        )
      );
  }

  async update(
    id: string,
    data: Partial<FaqInsert>
  ): Promise<FaqEntity | null> {
    const [updated] = await db
      .update(faqs)
      .set({
        ...data,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(faqs.id, id))
      .returning();

    return updated || null;
  }

  async delete(id: string): Promise<boolean> {
    const [deleted] = await db
      .delete(faqs)
      .where(eq(faqs.id, id))
      .returning();

    return !!deleted;
  }
}