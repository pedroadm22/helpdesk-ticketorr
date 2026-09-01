import type { RegisterClientDTO } from "../dtos/register-client.dto";
import { registerClientUseCase } from "../use-cases/register-client.usecase";

export async function registerClientHandler(
  body: RegisterClientDTO
) {
  const data: RegisterClientDTO = {
    name: body.name?.trim(),
    email: body.email?.trim().toLowerCase(),
    password: body.password,
  };

  return registerClientUseCase(data);
}