import { IAuthRepository } from "../repositories/auth.repository.interface";
import { LoginInputDto } from "@/modules/auth/dto/login-submit.dto";

export class LoginUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(dto: LoginInputDto) {
    // 1. Executa a tentativa de login via Repositório
    const result = await this.authRepository.signInWithEmail(dto);

    if (!result.success) {
      throw new Error(result.message || "Falha na autenticação.");
    }

    return result;
  }
}