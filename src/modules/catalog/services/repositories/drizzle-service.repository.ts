import { db } from "@/infrastructure/db";
import { services, departments } from "@/infrastructure/db/schema";
import { eq, and, ilike, count, sql } from "drizzle-orm";

import type { IServiceRepository } from "./service-repository.interface";
import type { CreateServiceDTO } from "../dtos/create-service.dto";
import type { UpdateServiceDTO } from "../dtos/update-service.dto";
import type { ListServicesFilterDTO } from "../dtos/list-services-filter.dto";
import type { ServiceResponseDTO } from "../dtos/service-response.dto";

export const drizzleServiceRepository: IServiceRepository = {
  // 1. CRIAR SERVIÇO
  create: async (dto: CreateServiceDTO): Promise<ServiceResponseDTO> => {
    const [newService] = await db
      .insert(services)
      .values([{
        name: dto.name,
        description: dto.description,
        departmentId: dto.departmentId,
        slaHours: dto.slaHours,
        servicePriority: dto.servicePriority,
        isActive: dto.isActive,
      }])
      .returning();

    // Busca com o join do departamento para retornar o DTO completo
    const result = await drizzleServiceRepository.findById(newService.id);
    if (!result) {
      throw new Error("Erro ao carregar serviço recém-criado.");
    }

    return result;
  },

  // 2. ATUALIZAR SERVIÇO
  update: async (dto: UpdateServiceDTO): Promise<ServiceResponseDTO> => {
    const { id, ...dataToUpdate } = dto;

    await db
      .update(services)
      .set({
        ...dataToUpdate,
        updatedAt: new Date(),
      })
      .where(eq(services.id, id));

    const updated = await drizzleServiceRepository.findById(id);
    if (!updated) {
      throw new Error("Erro ao carregar serviço atualizado.");
    }

    return updated;
  },

  // 3. BUSCAR POR ID
  findById: async (id: string): Promise<ServiceResponseDTO | null> => {
    const [result] = await db
      .select({
        id: services.id,
        name: services.name,
        description: services.description,
        departmentId: services.departmentId,
        departmentName: departments.name,
        slaHours: services.slaHours,
        servicePriority: services.servicePriority,
        isActive: services.isActive,
        createdAt: services.createdAt,
        updatedAt: services.updatedAt,
      })
      .from(services)
      .leftJoin(departments, eq(services.departmentId, departments.id))
      .where(eq(services.id, id));

    return (result as ServiceResponseDTO) || null;
  },

  // 4. BUSCAR POR NOME (Para evitar duplicidade)
  findByName: async (name: string): Promise<ServiceResponseDTO | null> => {
    const [result] = await db
      .select({
        id: services.id,
        name: services.name,
        description: services.description,
        departmentId: services.departmentId,
        departmentName: departments.name,
        slaHours: services.slaHours,
        servicePriority: services.servicePriority,
        isActive: services.isActive,
        createdAt: services.createdAt,
        updatedAt: services.updatedAt,
      })
      .from(services)
      .leftJoin(departments, eq(services.departmentId, departments.id))
      .where(sql`LOWER(${services.name}) = LOWER(${name})`);

    return (result as ServiceResponseDTO) || null;
  },

  // 5. LISTAR COM FILTROS E PAGINAÇÃO
  list: async (
    filter: ListServicesFilterDTO
  ): Promise<{ data: ServiceResponseDTO[]; total: number }> => {
    const { search, departmentId, isActive, page = 1, limit = 10 } = filter;
    const offset = (page - 1) * limit;

    // Construção dos filtros dinâmicos
    const conditions = [];

    if (search) {
      conditions.push(ilike(services.name, `%${search}%`));
    }

    if (departmentId) {
      conditions.push(eq(services.departmentId, departmentId));
    }

    if (isActive !== undefined) {
      conditions.push(eq(services.isActive, isActive));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Query dos dados
    const data = await db
      .select({
        id: services.id,
        name: services.name,
        description: services.description,
        departmentId: services.departmentId,
        departmentName: departments.name,
        slaHours: services.slaHours,
        servicePriority: services.servicePriority,
        isActive: services.isActive,
        createdAt: services.createdAt,
        updatedAt: services.updatedAt,
      })
      .from(services)
      .leftJoin(departments, eq(services.departmentId, departments.id))
      .where(whereClause)
      .limit(limit)
      .offset(offset);

    // Query de contagem total para paginação
    const [{ totalCount }] = await db
      .select({ totalCount: count() })
      .from(services)
      .where(whereClause);

    return {
      data: data as ServiceResponseDTO[],
      total: Number(totalCount),
    };
  },

  // 6. DELETAR SERVIÇO
  delete: async (id: string): Promise<void> => {
    await db.delete(services).where(eq(services.id, id));
  },
};