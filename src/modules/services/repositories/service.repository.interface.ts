import { services } from "@/infrastructure/db/schema/services";

// 🌟 Tipos exportados centralizados para todo o módulo
export type ServiceEntity = typeof services.$inferSelect;
export type ServiceInsert = typeof services.$inferInsert;

export interface IServiceRepository {
  create(data: ServiceInsert): Promise<ServiceEntity>;
  findById(id: string): Promise<ServiceEntity | null>;
  findByName(name: string): Promise<ServiceEntity | null>;
  findByDepartmentId(departmentId: string): Promise<ServiceEntity[]>;
  findAll(): Promise<ServiceEntity[]>;
  update(id: string, data: Partial<ServiceInsert>): Promise<ServiceEntity | null>;
  delete(id: string): Promise<boolean>;
}