// src/modules/catalog/repositories/service.repository.ts
import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { services } from "@/infrastructure/db/schema/services";
import { departments } from "@/infrastructure/db/schema/departments";

export type ServiceEntity = typeof services.$inferSelect;
export type ServiceInsert = typeof services.$inferInsert;

export const serviceRepository = {
  async create(data: ServiceInsert): Promise<ServiceEntity> {
    const [inserted] = await db.insert(services).values(data).returning();
    if (!inserted) throw new Error("Erro ao criar o serviço.");
    return inserted;
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

  // Método unificado para trazer o serviço com o nome do departamento
  async findAllWithDepartment() {
    return await db
      .select({
        id: services.id,
        name: services.name,
        description: services.description,
        departmentId: services.departmentId,
        departmentName: departments.name,
        createdAt: services.createdAt,
      })
      .from(services)
      .innerJoin(departments, eq(services.departmentId, departments.id));
  },
};