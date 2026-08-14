export type UserRole = "CLIENT" | "TECHNICIAN" | "ADMIN";

export type User = Readonly<{
  id: string;
  name: string;
  email: string;
  role: UserRole;
  departmentId: string | null;
  avatarUrl: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}>;