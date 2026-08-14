export type Department = Readonly<{
  id: string;
  name: string;
  description: string | null;
  isActive: boolean; // Soft Delete
  createdAt: Date;
  updatedAt: Date;
}>;