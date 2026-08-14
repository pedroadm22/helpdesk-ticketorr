import { CreateFaqInput } from "../dto/create-faq.dto";
import { faqRepository, FaqEntity } from "../repositories/faq.repository";

export async function createFaqUseCase(input: CreateFaqInput): Promise<FaqEntity> {
  // 1. Tratamento do slug a partir da entrada ou da pergunta
  const slug =
    input.slug ||
    input.question
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  // 2. Chamada direta ao repositório funcional
  return await faqRepository.create({
    question: input.question,
    answer: input.answer,
    slug,
    isActive: input.isActive ?? true,
    departmentId: input.departmentId || null,
    serviceId: input.serviceId || null,
  });
}