import type { SignInDTO } from "../dtos/sign-in.dto";
import { signInUseCase } from "../use-cases/sign-in.usecase";


export async function signInHandler(
  body: SignInDTO
) {
  const data: SignInDTO = {
    email: body.email.trim().toLowerCase(),
    password: body.password,
  };

  return signInUseCase(data);
}