import {
  CreateDepartmentInput,
  createDepartmentSchema,
} from "../dto/create-department.dto";
import {
  departmentRepository,
  DepartmentEntity,
} from "../repositories/department.repository";

export async function createDepartmentUseCase(
  input: CreateDepartmentInput
): Promise<DepartmentEntity> {
  // 1. Valida a entrada com o Zod
  const validatedData = createDepartmentSchema.parse(input);

  // 2. Regra de Negócio: Verifica se já existe um departamento com o mesmo nome
  const existingDepartment = await departmentRepository.findByName(
    validatedData.name
  );

  if (existingDepartment) {
    throw new Error("Já existe um departamento cadastrado com este nome.");
  }

  // 3. Cria o departamento através do repositório funcional
  const newDepartment = await departmentRepository.create({
    name: validatedData.name,
    description: validatedData.description ?? null,
  });

  return newDepartment;
}