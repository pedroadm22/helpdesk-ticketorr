import type { User } from "@/shared/domain/types/user.type";
import type { RegisterTechnicianDTO } from "../dtos/register-technician.dto";

import { RegisterTechnicianUseCase } from "../use-cases/register-technician.usecase";

export async function RegisterTechnicianHandler(
  currentUser: User,
  body: RegisterTechnicianDTO
) {
  const data: RegisterTechnicianDTO = {
    name: body.name?.trim(),
    email: body.email?.trim().toLowerCase(),
    password: body.password,
    departmentId: body.departmentId,
    teamId: body.teamId ?? null,
  };

  return RegisterTechnicianUseCase(
    currentUser,
    data
  );
}