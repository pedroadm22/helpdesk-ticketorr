import { eq, like, or, and, count } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { users } from "@/infrastructure/db/schema";
import { IUserRepository } from "./user-repository.interface";
import { User } from "@/shared/types/domain/db.type";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { UpdateUserDTO } from "../dtos/update-user.dto";
import { ListUsersFilterDTO } from "../dtos/list-users-filter.dto";

export const drizzleUserRepository: IUserRepository = {
  findById: async (id: string): Promise<User | null> => {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || null;
  },

  findByEmail: async (email: string): Promise<User | null> => {
    const [user] = await db.select().from(users).where(eq(users.email, email.toLowerCase()));
    return user || null;
  },

  create: async (data: CreateUserDTO): Promise<User> => {
    const [created] = await db
      .insert(users)
      .values({
        id: data.id, // Opcional, se vier do Supabase Auth
        name: data.name,
        email: data.email,
        role: data.role,
        departmentId: data.departmentId,
        avatarUrl: data.avatarUrl,
      })
      .returning();

    return created;
  },

  update: async (data: UpdateUserDTO): Promise<User> => {
    const { id, ...updateFields } = data;

    const [updated] = await db
      .update(users)
      .set({
        ...updateFields,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    return updated;
  },

  list: async (filters: ListUsersFilterDTO): Promise<{ users: User[]; total: number }> => {
    const conditions = [];

    if (filters.role) {
      conditions.push(eq(users.role, filters.role));
    }

    if (filters.departmentId) {
      conditions.push(eq(users.departmentId, filters.departmentId));
    }

    if (filters.search) {
      const searchPattern = `%${filters.search}%`;
      conditions.push(
        or(like(users.name, searchPattern), like(users.email, searchPattern))
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    const offset = (filters.page - 1) * filters.limit;

    const [resultUsers, [{ totalCount }]] = await Promise.all([
      db.select().from(users).where(whereClause).limit(filters.limit).offset(offset),
      db.select({ totalCount: count() }).from(users).where(whereClause),
    ]);

    return {
      users: resultUsers,
      total: Number(totalCount),
    };
  },

  delete: async (id: string): Promise<void> => {
    await db.delete(users).where(eq(users.id, id));
  },
};