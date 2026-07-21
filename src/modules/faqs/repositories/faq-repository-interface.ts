import { faqs } from "@/infrastructure/db/schema";

export type FaqEntity = typeof faqs.$inferSelect;
export type FaqInsert = typeof faqs.$inferInsert;

export interface IFaqRepository {
  create(data: FaqInsert): Promise<FaqEntity>;
  findById(id: string): Promise<FaqEntity | null>;
  update(id: string, data: Partial<FaqInsert>): Promise<FaqEntity | null>;
}