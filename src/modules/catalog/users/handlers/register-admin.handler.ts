import type { User } from "@/shared/domain/types/user.type";
import { RegisterAdminUseCase } from "@/modules/catalog/users/use-cases/register-admin.usecase";
import { RegisterAdminDTO } from "../dtos";

export async function createAdminHandler(
  currentUser: User,
  body: RegisterAdminDTO
) {
  const data: RegisterAdminDTO = {
    name: body.name?.trim(),
    email: body.email?.trim().toLowerCase(),
    password: body.password,
    departmentId: body.departmentId,
  };

  return RegisterAdminUseCase(
    currentUser,
    data
  );
}