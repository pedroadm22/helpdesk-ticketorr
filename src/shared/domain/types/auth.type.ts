import type { User as BetterAuthUser, Session as BetterAuthSession } from "better-auth";
import type { UserRole } from "./user-role.type";

export type AppUser = BetterAuthUser & {
  role: UserRole;
  departmentId?: string | null;
  departmentName?: string | null;
};

export type AppSession = {
  user: AppUser;
  session: BetterAuthSession;
};

export type UserSummary = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: UserRole;
};