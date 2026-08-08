export type Department = Readonly<{
  id: string;
  name: string;
  description: string | null;
  active: boolean; // Soft Delete
  createdAt: Date;
  updatedAt: Date;
}>;