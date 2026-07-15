import { auth } from "@/infrastructure/auth"; // 🌟 Importação correta do SERVIDOR
import { RegisterInput, registerSchema } from "../dto/RegisterDto";

export class RegisterUseCase {
  async execute(input: RegisterInput): Promise<{ userId: string; email: string }> {
    // 1. Validamos os dados recebidos utilizando o nosso DTO (Zod)
    const validatedData = registerSchema.parse(input);

    // 2. Registramos o usuário usando a API nativa de servidor do Better Auth
    // Como 'role' tem o defaultValue: "CLIENT" no banco e input: false,
    // o Better Auth se encarrega de preencher a role automaticamente de forma segura!
    const user = await auth.api.signUpEmail({
      body: {
        email: validatedData.email,
        password: validatedData.password,
        name: validatedData.name,
      },
    });

    if (!user) {
      throw new Error("Erro inesperado ao registrar o usuário no sistema.");
    }

    return {
      userId: user.user.id,
      email: user.user.email,
    };
  }
}