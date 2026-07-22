import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/db"; // Ajuste o caminho para a sua conexão
import { departments } from "@/infrastructure/db/schema/departments";
import {
  IDepartmentRepository,
  DepartmentEntity,
  DepartmentInsert,
} from "./department.repository.interface";

export class DepartmentRepository implements IDepartmentRepository {
  async create(data: DepartmentInsert): Promise<DepartmentEntity> {
    const [inserted] = await db.insert(departments).values(data).returning();

    if (!inserted) {
      throw new Error("Erro ao criar departamento no banco de dados.");
    }

    return inserted;
  }

  async findById(id: string): Promise<DepartmentEntity | null> {
    const [department] = await db
      .select()
      .from(departments)
      .where(eq(departments.id, id));

    return department || null;
  }

  async findByName(name: string): Promise<DepartmentEntity | null> {
    const [department] = await db
      .select()
      .from(departments)
      .where(eq(departments.name, name));

    return department || null;
  }

  async findAll(): Promise<DepartmentEntity[]> {
    return await db.select().from(departments);
  }

  async update(
    id: string,
    data: Partial<DepartmentInsert>
  ): Promise<DepartmentEntity | null> {
    const [updated] = await db
      .update(departments)
      .set({
        ...data,
        updatedAt: new Date(), // Garante a atualização do timestamp
      })
      .where(eq(departments.id, id))
      .returning();

    return updated || null;
  }

  async delete(id: string): Promise<boolean> {
    const [deleted] = await db
      .delete(departments)
      .where(eq(departments.id, id))
      .returning();

    return !!deleted;
  }
}