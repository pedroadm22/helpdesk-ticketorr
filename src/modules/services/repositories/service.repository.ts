import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { services } from "@/infrastructure/db/schema/services";

// 🌟 Tipos exportados diretamente do schema do Drizzle
export type ServiceEntity = typeof services.$inferSelect;
export type ServiceInsert = typeof services.$inferInsert;

export const serviceRepository = {
  async create(data: ServiceInsert): Promise<ServiceEntity> {
    const [inserted] = await db.insert(services).values(data).returning();

    if (!inserted) {
      throw new Error("Erro ao criar o serviço no banco de dados.");
    }

    return inserted;
  },

  async findById(id: string): Promise<ServiceEntity | null> {
    const [service] = await db
      .select()
      .from(services)
      .where(eq(services.id, id));

    return service || null;
  },

  async findByName(name: string): Promise<ServiceEntity | null> {
    const [service] = await db
      .select()
      .from(services)
      .where(eq(services.name, name));

    return service || null;
  },

  async findByDepartmentId(departmentId: string): Promise<ServiceEntity[]> {
    return await db
      .select()
      .from(services)
      .where(eq(services.departmentId, departmentId));
  },

  async findAll(): Promise<ServiceEntity[]> {
    return await db.select().from(services);
  },

  async update(
    id: string,
    data: Partial<ServiceInsert>
  ): Promise<ServiceEntity | null> {
    const [updated] = await db
      .update(services)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(services.id, id))
      .returning();

    return updated || null;
  },

  async delete(id: string): Promise<boolean> {
    const [deleted] = await db
      .delete(services)
      .where(eq(services.id, id))
      .returning();

    return !!deleted;
  },
};