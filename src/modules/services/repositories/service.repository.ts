// src/modules/catalog/repositories/service.repository.ts
import { db } from "@/infrastructure/db";
import { services, departments, tickets } from "@/infrastructure/db/schema";
import { eq, count } from "drizzle-orm";

// Definição do tipo/entidade do serviço
export type ServiceEntity = typeof services.$inferSelect;

export const serviceRepository = {
  // 1. Para o Painel Admin (Tabela Geral de Serviços com nome do Departamento)
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

  // 2. Para a Abertura de Chamados (Filtro por Departamento)
  async findByDepartmentId(departmentId: string): Promise<ServiceEntity[]> {
    return await db
      .select()
      .from(services)
      .where(eq(services.departmentId, departmentId));
  },

  // 3. Buscar Serviço Único por ID (para Edição)
  async findById(id: string): Promise<ServiceEntity | null> {
    const [service] = await db
      .select()
      .from(services)
      .where(eq(services.id, id));
    return service || null;
  },

  // 4. Contar serviços de um departamento (usado na validação de exclusão do departamento)
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

  // 5. Salvar (Criar ou Atualizar)
  async save(data: { id?: string; name: string; description?: string | null; departmentId: string }) {
    if (data.id) {
      const [updated] = await db
        .update(services)
        .set({
          name: data.name,
          description: data.description,
          departmentId: data.departmentId,
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

  // 6. Remover Serviço
  async delete(id: string) {
    await db.delete(services).where(eq(services.id, id));
  },
};