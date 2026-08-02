import { User } from "@/shared/types/domain/db.type";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { UpdateUserDTO } from "../dtos/update-user.dto";
import { ListUsersFilterDTO } from "../dtos/list-users-filter.dto";

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserDTO): Promise<User>;
  update(data: UpdateUserDTO): Promise<User>;
  list(filters: ListUsersFilterDTO): Promise<{ users: User[]; total: number }>;
  delete(id: string): Promise<void>;
}