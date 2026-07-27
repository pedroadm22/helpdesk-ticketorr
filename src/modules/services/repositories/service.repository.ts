// src/modules/catalog/repositories/service.repository.ts
import { db } from "@/infrastructure/db";
import { services, departments, tickets } from "@/infrastructure/db/schema";
import { eq, count } from "drizzle-orm";
import { CreateServiceInput } from "../dto/create-service.dto";
import { UpdateServiceInput } from "../dto/update-service.dto";

export type ServiceEntity = typeof services.$inferSelect;

export const serviceRepository = {
  async findAllWithDepartment() {
    return await db
      .select({
        id: services.id,
        name: services.name,
        description: services.description,
        departmentId: services.departmentId,
        departmentName: departments.name,
      })
      .from(services)
      .leftJoin(departments, eq(services.departmentId, departments.id));
  },

  async findByDepartmentId(departmentId: string): Promise<ServiceEntity[]> {
    return await db
      .select()
      .from(services)
      .where(eq(services.departmentId, departmentId));
  },

  async findById(id: string): Promise<ServiceEntity | null> {
    const [service] = await db
      .select()
      .from(services)
      .where(eq(services.id, id));
    return service || null;
  },

  async countByDepartmentId(departmentId: string): Promise<number> {
    const [result] = await db
      .select({ count: count() })
      .from(services)
      .where(eq(services.departmentId, departmentId));
    return result?.count || 0;
  },

  async countTicketsByServiceId(serviceId: string): Promise<number> {
    const [result] = await db
      .select({ count: count() })
      .from(tickets)
      .where(eq(tickets.serviceId, serviceId));

    return result?.count || 0;
  },

  async create(data: CreateServiceInput): Promise<ServiceEntity> {
    const [newService] = await db
      .insert(services)
      .values({
        name: data.name,
        description: data.description,
        departmentId: data.departmentId,
      })
      .returning();

    return newService;
  },

  async update(id: string, data: UpdateServiceInput): Promise<ServiceEntity | undefined> {
    const [updatedService] = await db
      .update(services)
      .set({
        ...(data.name !== undefined && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.departmentId !== undefined && { departmentId: data.departmentId }),
        updatedAt: new Date(),
      })
      .where(eq(services.id, id))
      .returning();

    return updatedService;
  },

  // 🔄 Método Save (Cria se não tiver ID, atualiza se tiver)
  async save(data: { id?: string; name: string; description?: string | null; departmentId: string }): Promise<ServiceEntity | undefined> {
    if (data.id) {
      const [updated] = await db
        .update(services)
        .set({
          name: data.name,
          description: data.description,
          departmentId: data.departmentId,
          updatedAt: new Date(),
        })
        .where(eq(services.id, data.id))
        .returning();
      return updated;
    }

    const [created] = await db
      .insert(services)
      .values({
        name: data.name,
        description: data.description,
        departmentId: data.departmentId,
      })
      .returning();
    return created;
  },

  async delete(id: string): Promise<void> {
    await db.delete(services).where(eq(services.id, id));
  },
};