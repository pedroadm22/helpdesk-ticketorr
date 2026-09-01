import type { User, UserRole } from "@/shared/domain/types/user.type";

import type { Permission } from "./permissions.type";

export const allPermissions: Permission[] = [
  // Ticket
  "ticket:create",
  "ticket:view",
  "ticket:update",
  "ticket:respond",
  "ticket:assign",
  "ticket:reopen",
  "ticket:close",

  // User
  "user:view",
  "user:create",
  "user:update",
  "user:deactivate",

  // Department
  "department:view",
  "department:manage",

  // Team
  "team:view",
  "team:manage",

  // Service
  "service:view",
  "service:manage",

  // Triage
  "triage:view",
  "triage:manage",
];

export const rolePermissions: Record<
  UserRole,
  Permission[]
> = {
  client: [
    "ticket:create",
    "ticket:view",
    "ticket:respond",
    "ticket:reopen",
  ],

  technician: [
    "ticket:view",
    "ticket:respond",
    "ticket:reopen",
  ],

  admin: [
    // Ticket
    "ticket:create",
    "ticket:view",
    "ticket:update",
    "ticket:respond",
    "ticket:assign",
    "ticket:reopen",
    "ticket:close",

    // User
    "user:view",
    "user:create",
    "user:update",
    "user:deactivate",

    // Department
    "department:view",
    "department:manage",

    // Team
    "team:view",
    "team:manage",

    // Service
    "service:view",
    "service:manage",

    // Triage
    "triage:view",
    "triage:manage",
  ],

  super_admin: allPermissions,
};