import { Client } from "@/shared/domain/types/user.type";

export type RegisterDTO =
  Pick<Client, "name" | "email"> & {
    password: string;
  };