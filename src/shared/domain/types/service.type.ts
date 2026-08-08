export type Service = Readonly<{
  id: string;
  name: string;
  description: string | null;
  departmentId: string;
  slaHours: number; // Armazenado como inteiro no domínio (ex: 24)
  isFallback: boolean; // Indica se é serviço genérico ("Outros")
  active: boolean; // Soft Delete
  createdAt: Date;
  updatedAt: Date;
}>;