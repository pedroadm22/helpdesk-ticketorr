import '@testing-library/jest-dom';
import { formatarHora } from "@/shared/utils/chatHelpers"


test("deve formatar a hora em HH:MM no padrão brasileiro", () => {
   expect(formatarHora("2026-07-28T14:56:00")).toBe("14:56 PM");
});