export type UserRole =
  | "client"
  | "technician"
  | "admin"
  | "super_admin";

export type User = {
  id: string;
  name: string;
  email: string;

  role: UserRole;

  departmentId: string | null;
  teamId: string | null;

  active: boolean;

  createdAt: Date;
  updatedAt: Date;
};