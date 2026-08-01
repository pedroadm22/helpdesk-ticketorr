// src/types/action.ts

/**
 * Padrão para respostas de Server Actions e APIs internas.
 * Se success for true, 'data' conterá o resultado esperado.
 * Se success for false, 'error' descreverá o problema.
 */
export type ActionResponse<T = undefined> =
  | {
      success: true;
      data: T;
      message?: string;
    }
  | {
      success: false;
      error: string;
      validationErrors?: Record<string, string[]>; // Útil para erros campo a campo do Zod
    };
