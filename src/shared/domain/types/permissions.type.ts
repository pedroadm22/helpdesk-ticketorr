import { DepartmentAction, ServiceAction, TeamAction, TicketAction, TriageAction, UserAction } from "./actions.type";
import { UserRole } from "./user.type";

export type Permission =
  | `ticket:${TicketAction}`
  | `user:${UserAction}`
  | `department:${DepartmentAction}`
  | `team:${TeamAction}`
  | `service:${ServiceAction}`
  | `triage:${TriageAction}`;

export type RolePermissions = Record<
  UserRole,
  Permission[]
>;