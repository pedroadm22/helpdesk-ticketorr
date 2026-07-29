import { eq } from "drizzle-orm";

import { db } from "@/infrastructure/db/";
import { departments } from "@/infrastructure/db/schema/catalog";
import { formatarDataCriacao } from "@/shared/utils/formatar-data";
import type {
  CriarDepartmentDto,
  AtualizarDepartmentDto,
  DepartmentRespostaDto,
} from "../dtos";

type DepartmentRow = typeof departments.$inferSelect;

function mapDepartment(row: DepartmentRow): DepartmentRespostaDto {
  return {
    id: row.id,
    name: row.name,
    criadoEm: formatarDataCriacao(row.createdAt),
    ...(row.description ? { description: row.description } : {}),
  };
}

export const repositorioDepartment = {
  async buscarTodos(): Promise<DepartmentRespostaDto[]> {
    const rows = await db.select().from(departments);
    return rows.map(mapDepartment);
  },

  async buscarPorId(id: string): Promise<DepartmentRespostaDto | null> {
    const [department] = await db
      .select()
      .from(departments)
      .where(eq(departments.id, id));

    return department ? mapDepartment(department) : null;
  },

  async salvar(dados: CriarDepartmentDto): Promise<DepartmentRespostaDto> {
    const [criado] = await db
      .insert(departments)
      .values({
        name: dados.name,
        description: dados.description ?? null,
      })
      .returning();

    if (!criado) {
      throw new Error("Não foi possível cadastrar o departamento.");
    }

    return mapDepartment(criado);
  },

  async atualizar(dados: AtualizarDepartmentDto): Promise<DepartmentRespostaDto> {
    const [atualizado] = await db
      .update(departments)
      .set({
        ...(dados.name ? { name: dados.name } : {}),
        ...(dados.description !== undefined ? { description: dados.description } : {}),
      })
      .where(eq(departments.id, dados.id))
      .returning();

    if (!atualizado) {
      throw new Error("Departamento não encontrado para atualização.");
    }

    return mapDepartment(atualizado);
  },

  async remover(id: string): Promise<void> {
    await db.delete(departments).where(eq(departments.id, id));
  },
};

export type RepositorioDepartment = typeof repositorioDepartment;