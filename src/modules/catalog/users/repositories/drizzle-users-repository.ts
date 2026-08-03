import { eq, like, or, and, count, ilike, SQL, desc } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { users } from "@/infrastructure/db/schema";
import { IUserRepository } from "./user-repository.interface";
import { User } from "@/shared/types/domain/db.type";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { UpdateUserDTO } from "../dtos/update-user.dto";
import { ListUsersFilterDTO } from "../dtos/list-users-filter.dto";
import { UserResponseDTO } from "../dtos/user-response.dto";

const defaultWith = {
  department: {
    columns: { id: true, name: true },
  },
} as const;

export const drizzleUserRepository: IUserRepository = {
  findById: async (id: string): Promise<User | null> => {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || null;
  },

  findByEmail: async (email: string): Promise<User | null> => {
    const [user] = await db.select().from(users).where(eq(users.email, email.toLowerCase()));
    return user || null;
  },
  findAll: async (filters?: ListUsersFilterDTO): Promise<UserResponseDTO[]> => {
    const conditions: SQL[] = [];

    if (filters?.search) {
      conditions.push(
        or(
          ilike(users.name, `%${filters.search}%`),
          ilike(users.email, `%${filters.search}%`)
        )!
      );
    }

    if (filters?.role) {
      conditions.push(eq(users.role, filters.role));
    }

    if (filters?.departmentId) {
      conditions.push(eq(users.departmentId, filters.departmentId));
    }

    const results = await db.query.users.findMany({
      where: conditions.length > 0 ? and(...conditions) : undefined,
      orderBy: [desc(users.createdAt)],
      with: defaultWith,
    });

    return results as UserResponseDTO[];
  },

  create: async (data: CreateUserDTO): Promise<User> => {
  if (!data.id) {
    throw new Error("User ID (Supabase Auth ID) is required to create a user profile.");
  }

  const [created] = await db
    .insert(users)
    .values([
      {
        id: data.id ?? crypto.randomUUID(), // 🔑 Agora o TS sabe que o id é 100% presente (string)
        name: data.name,
        email: data.email,
        role: data.role,
        departmentId: data.departmentId ?? null,
        ...(data.avatarUrl ? { image: data.avatarUrl } : {}), // Só passa 'image' se tiver valor, respeitando o .default() do schema
      },
    ])
    .returning();

  if (!created) {
    throw new Error("Failed to create user.");
  }

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