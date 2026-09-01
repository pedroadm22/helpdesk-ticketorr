export interface BaseUser {
  id: string;

  name: string;
  email: string;

  active: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export interface Client extends BaseUser {
  role: "client";

  departmentId: null;
  teamId: null;
}

export interface Technician extends BaseUser {
  role: "technician";

  departmentId: string;
  teamId: string | null;
}

export interface Admin extends BaseUser {
  role: "admin";

  departmentId: string;
  teamId: null;
}

export interface SuperAdmin extends BaseUser {
  role: "super_admin";

  departmentId: null;
  teamId: null;
}

export type User =
  | Client
  | Technician
  | Admin
  | SuperAdmin;

export type UserRole = User["role"];