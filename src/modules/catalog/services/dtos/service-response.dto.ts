import { TicketPriority } from "@/shared/types/domain/zod.types"

export interface ServiceResponseDTO {
  id: string;
  name: string;
  description: string | null;
  departmentId: string;
  departmentName: string | null;
  slaHours: number;
  servicePriority: TicketPriority;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}