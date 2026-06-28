import { z } from "zod";
import { hashSync } from "bcrypt-ts";
import { db } from "@/infrastructure/db";
import { user } from "@/infrastructure/schemas/schema";

// 1. Criamos o molde de validação (Schema do Zod)
const criarUsuarioSchema = z.object({
  nome: z.string().min(3),
  email: z.email(),
  senha: z.string().min(6),
});

export async function registrarUsuario(payload: any) {
  // 🟢 AQUI ESTÁ A SOLUÇÃO: Criando a variável 'dadosValidados'
  // O Zod analisa o 'payload' bruto e garante que ele tem nome, email e senha certinhos
  const dadosValidados = criarUsuarioSchema.parse(payload);

  // Agora que a variável existe, você pode ler as propriedades dela:
  const senhaCriptografada = hashSync(dadosValidados.senha, 10);

  // E salvar no banco sem o TypeScript reclamar
  const [novoUsuario] = await db
    .insert(user)
    .values({
      id: crypto.randomUUID(), 
      name: dadosValidados.nome,   // 👈 Agora ele sabe o que é dadosValidados!
      email: dadosValidados.email, // 👈 Aqui também!
      role: "CLIENTE",
    })
    .returning();

  return novoUsuario;
}