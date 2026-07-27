import {
  UpdateDepartmentInput,
  updateDepartmentSchema,
} from "../dto/update-department.dto";
import {
  departmentRepository,
  DepartmentEntity,
} from "../repositories/department.repository";

export async function updateDepartmentUseCase(
  input: UpdateDepartmentInput
): Promise<DepartmentEntity> {
  // 1. Valida a entrada com o Zod
  const validatedData = updateDepartmentSchema.parse(input);

  // 2. Regra de Negócio: Verifica se o departamento existe
  const existingDepartment = await departmentRepository.findById(
    validatedData.id
  );

  if (!existingDepartment) {
    throw new Error("Não foi possível atualizar: Departamento não encontrado.");
  }

  // 3. Regra de Negócio: Se alterou o nome, garante que não colide com outro departamento existente
  if (validatedData.name && validatedData.name !== existingDepartment.name) {
    const departmentWithSameName = await departmentRepository.findByName(
      validatedData.name
    );

    if (departmentWithSameName) {
      throw new Error("Já existe outro departamento cadastrado com este nome.");
    }
  }

  // 4. Atualiza os dados através do repositório
  const updatedDepartment = await departmentRepository.update(validatedData.id, {
    ...(validatedData.name && { name: validatedData.name }),
    ...(validatedData.description !== undefined && {
      description: validatedData.description,
    }),
  });

  if (!updatedDepartment) {
    throw new Error("Erro ao atualizar o departamento.");
  }

  return updatedDepartment;
}