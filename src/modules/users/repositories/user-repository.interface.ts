import { User } from '@/shared/domain/types';
import {
  CreateUserDTO,
  UpdateUserDTO,
  FilterUsersDTO,
  UserResponseDTO,
} from '../dtos';

export interface IUserRepository {
  // Extrai os tipos dos parâmetros direto das chaves dos DTOs de operação
  findById(id: UserResponseDTO): Promise<User | null>;
  findByEmail(email: CreateUserDTO['email']): Promise<User | null>;
  
  // Consultas paginadas e filtradas
  findMany(filters?: FilterUsersDTO): Promise<User[]>;
  
  // Operações de persistência recebendo os DTOs diretamente
  create(data: CreateUserDTO): Promise<User>;
  update(data: UpdateUserDTO): Promise<User>;
}