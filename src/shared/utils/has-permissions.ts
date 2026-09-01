import type { User } from "@/shared/domain/types/user.type";

import type { Permission } from "../domain/types/permissions.type";
import { rolePermissions } from "../domain/types/role-permissions.type";

export function hasPermission(
  user: User,
  permission: Permission,
): boolean {
  return rolePermissions[user.role].includes(permission);
}