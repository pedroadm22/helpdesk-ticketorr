import { Service } from "@/shared/domain/types/service.type";

export type CreateServiceDTO = Omit<Service, 'id' | 'createdAt' | 'updatedAt'>;