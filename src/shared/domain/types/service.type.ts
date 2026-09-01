export interface Service {
  id: string;
  departmentId: string;
  slaTime: number;
  teamId: string | null;
  name: string;
  description: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}