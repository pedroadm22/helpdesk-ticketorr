import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/db/";
import { users } from "@/infrastructure/db/schemas/users";
import type { ListUsersDTO } from "../dtos/list-users.dto";
import type { User } from "@/shared/domain/types/user.type";

export const userRepository = {
  async findById(id: string): Promise<User | null> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return result[0] ?? null;
  },

  async findByEmail(email: string): Promise<User | null> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return result[0] ?? null;
  },

  async create(user: User): Promise<User> {
    const result = await db
      .insert(users)
      .values(user)
      .returning();

    return result[0];
  },

  async update(
    id: string,
    data: Partial<User>,
  ): Promise<User> {
    const result = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();

    return result[0];
  },

  async list(
    filters: ListUsersDTO,
  ): Promise<User[]> {
    const result = await db
      .select()
      .from(users);

    return result;
  },
};