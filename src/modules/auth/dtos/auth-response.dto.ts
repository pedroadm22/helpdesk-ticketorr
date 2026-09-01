import { User } from "@/shared/domain/types/user.type";
import type { Session } from "@supabase/supabase-js";

export type AuthResponseDTO = {
  user: Pick<User, "id" | "email">;
  session: Session | null;
};