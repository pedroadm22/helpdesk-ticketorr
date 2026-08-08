import { User } from '@/shared/domain/types/user.type';
import { SafeUser } from '@/shared/domain/types/safe-user.type';
import { UserFilters } from '@/shared/domain/types/user-filters.type';
import { PaginatedOutput } from '@/shared/domain/types/pagination.type';

export type UserRepository = Readonly<{
  findById: (id: string) => Promise<SafeUser | null>;
  findByEmail: (email: string) => Promise<User | null>; // Traz o User com passwordHash para autenticação
  save: (user: User) => Promise<SafeUser>;
  update: (user: User) => Promise<SafeUser>;
  existsByEmail: (email: string) => Promise<boolean>;
  findMany: (filters: UserFilters) => Promise<PaginatedOutput<SafeUser>>;
}>;