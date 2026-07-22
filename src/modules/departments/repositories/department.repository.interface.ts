import { departments } from "@/infrastructure/db/schema/departments";

// 🌟 Tipos exportados centralizados para todo o módulo
export type DepartmentEntity = typeof departments.$inferSelect;
export type DepartmentInsert = typeof departments.$inferInsert;

export interface IDepartmentRepository {
  create(data: DepartmentInsert): Promise<DepartmentEntity>;
  findById(id: string): Promise<DepartmentEntity | null>;
  findByName(name: string): Promise<DepartmentEntity | null>;
  findAll(): Promise<DepartmentEntity[]>;
  update(id: string, data: Partial<DepartmentInsert>): Promise<DepartmentEntity | null>;
  delete(id: string): Promise<boolean>;
}