export const USER_ROLES = ["CLIENT", "TECHNICIAN", "ADMIN"] as const

export type UserRole = typeof USER_ROLES;