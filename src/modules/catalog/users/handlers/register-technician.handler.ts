import type { User } from "@/shared/domain/types/user.type";
import type { RegisterTechnicianDTO } from "../dtos/register-technician.dto";

import { createTechnicianUseCase } from "../use-cases/register-technician.usecase";

export async function registerTechnicianHandler(
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

  return createTechnicianUseCase(
    currentUser,
    data
  );
}