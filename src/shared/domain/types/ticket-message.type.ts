export type ChatMessage = Readonly<{
  id: string;
  ticketId: string;
  senderId: string;
  content: string;
  isInternalNote: boolean;   // Se 'true', visível apenas para Técnicos e Admins
  createdAt: Date;
  updatedAt: Date;
}>;

export type Attachment = Readonly<{
  id: string;
  messageId: string;
  fileName: string;
  fileUrl: string;
  fileType: string;         // Ex: "image/png", "application/pdf"
  fileSize: number;         // Em bytes
  createdAt: Date;
}>;