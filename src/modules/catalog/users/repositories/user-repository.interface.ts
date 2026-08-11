import { User } from "@/shared/domain/types";
import {
  CreateUserDTO,
  UpdateUserDTO,
  FilterUsersDTO,
  UserResponseDTO,
} from "../dtos";

export interface IUserRepository {
  // Extrai os tipos dos parâmetros direto das chaves dos DTOs de operação
  findById(id: UserResponseDTO): Promise<User | null>;
  findByEmail(email: CreateUserDTO["email"]): Promise<User | null>;
  findMany(filters?: FilterUsersDTO): Promise<User[]>;
  create(data: CreateUserDTO): Promise<User>;
  update(data: UpdateUserDTO): Promise<User>;
}
