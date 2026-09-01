export type TicketAction =
  | "create"
  | "view"
  | "update"
  | "respond"
  | "assign"
  | "reopen"
  | "close";

export type UserAction =
  | "view"
  | "create"
  | "update"
  | "deactivate";

export type DepartmentAction =
  | "view"
  | "manage";

export type TeamAction =
  | "view"
  | "manage";

export type ServiceAction =
  | "view"
  | "manage";

export type TriageAction =
  | "view"
  | "manage";

export type Permission =
  | `ticket:${TicketAction}`
  | `user:${UserAction}`
  | `department:${DepartmentAction}`
  | `team:${TeamAction}`
  | `service:${ServiceAction}`
  | `triage:${TriageAction}`;