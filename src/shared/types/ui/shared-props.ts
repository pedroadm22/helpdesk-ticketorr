import { ActionResponse } from "../domain/action.type";
import { TicketStatus, TicketPriority } from "../domain/db.type";

// Props para Inputs de texto / e-mail / senha com suporte a mensagens de erro
export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
};

// Props para componentes de Select / Dropdown
export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
};

// Props para áreas de texto (descrição do ticket / comentários)
export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  maxLength?: number;
};