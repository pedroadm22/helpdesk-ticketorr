export interface Team {
  id: string;

  name: string;
  description: string | null;

  departmentId: string;

  active: boolean;

  createdAt: Date;
  updatedAt: Date;
}