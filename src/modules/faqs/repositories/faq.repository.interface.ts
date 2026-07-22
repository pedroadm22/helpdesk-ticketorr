import { faqs } from "@/infrastructure/db/schema/faqs";

// 🌟 Tipos exportados centralizados para todo o módulo
export type FaqEntity = typeof faqs.$inferSelect;
export type FaqInsert = typeof faqs.$inferInsert;

export interface IFaqRepository {
  create(data: FaqInsert): Promise<FaqEntity>;
  findById(id: string): Promise<FaqEntity | null>;
  findBySlug(slug: string): Promise<FaqEntity | null>;
  findAll(onlyActive?: boolean): Promise<FaqEntity[]>;
  findByDepartmentId(departmentId: string): Promise<FaqEntity[]>;
  findByServiceId(serviceId: string): Promise<FaqEntity[]>;
  update(id: string, data: Partial<FaqInsert>): Promise<FaqEntity | null>;
  delete(id: string): Promise<boolean>;
}