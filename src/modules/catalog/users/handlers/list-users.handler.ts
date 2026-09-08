import { User } from "@/shared/domain/types/user.type";
import { listUsersUseCase } from "../use-cases";
import { ListUsersDTO } from "../dtos";

export async function listUsersHandler(
  currentUser: User,
  filters: ListUsersDTO
) {
  return listUsersUseCase(
    currentUser,
    filters
  );
}