export interface FaqProblem {
  id: string;
  question: string;
  answer: string;
  departmentId: string | null; // Sugestão pré-configurada se falhar
  serviceId: string | null;    // Sugestão pré-configurada se falhar
}