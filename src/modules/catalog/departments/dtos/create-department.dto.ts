import { z } from "zod";
import { departmentBaseSchema } from "./department-base.schema";

export const criarDepartmentSchema = departmentBaseSchema;

export type CriarDepartmentDto = z.infer<typeof criarDepartmentSchema>;