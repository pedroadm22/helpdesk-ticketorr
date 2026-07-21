// faqs/use-cases/create-faq.use-case.ts
import { CreateFaqInput } from "../dto/CreateFaqDto";
import { IFaqRepository, FaqEntity } from "../repositories/faq-repository-interface";

export class CreateFaqUseCase {
  constructor(private faqRepository: IFaqRepository) {}

  async execute(input: CreateFaqInput): Promise<FaqEntity> {
    const slug = input.slug || input.question
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    return await this.faqRepository.create({
      question: input.question,
      answer: input.answer,
      slug,
      isActive: input.isActive ?? true,
      departmentId: input.departmentId || null,
      serviceId: input.serviceId || null,
    });
  }
}