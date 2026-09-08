import type { SignUpDTO } from "../dtos/sign-up.dto";
import { signUpUseCase } from "../use-cases/sign-up.usecase";

export async function signUpHandler(
  body: SignUpDTO
) {
  const data: SignUpDTO = {
    name: body.name.trim(),
    email: body.email.trim().toLowerCase(),
    password: body.password,
  };

  return signUpUseCase(data);
}