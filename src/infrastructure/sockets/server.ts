// src/infrastructure/sockets/server.ts
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { enviarMensagemUseCase } from "@/modules/tickets/use-cases/EnviarMensagemUseCase";
import { EnviarMensagemSchema } from "@/modules/tickets/dto/MensagemEnviadaDto";

const httpServer = createServer();

// Configura o Socket.io permitindo requisições do nosso front-end Next.js
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Porta padrão do seu Next.js
    methods: ["GET", "POST"],
  },
});

console.log("🚀 Servidor Socket.io inicializado e aguardando conexões...");

io.on("connection", (socket) => {
  console.log(`🔌 Usuário conectado ao chat: ${socket.id}`);

  // Evento 1: Entrar na sala do chamado específico (Room)
  socket.on("entrar_chamado", (data: { ticketId: string }) => {
    if (!data.ticketId) return;
    
    socket.join(data.ticketId);
    console.log(`📬 Usuário [${socket.id}] entrou na sala do ticket: ${data.ticketId}`);
  });

  // Evento 2: Receber mensagem do front-end e propagar
  socket.on("enviar_mensagem", async (payload, callback) => {
    try {
      // 1. Validação imediata com o Zod na porta de entrada do servidor
      const dadosValidados = EnviarMensagemSchema.parse(payload);

      // 2. Persiste a mensagem no banco de dados SQLite via Use Case
      const novaMensagem = await enviarMensagemUseCase(dadosValidados);

      // 3. Distribui a mensagem exclusivamente para as pessoas daquela sala (room)
      io.to(dadosValidados.ticketId).emit("receber_mensagem", novaMensagem);

      // 4. Confirma para o remetente que a mensagem foi processada com sucesso (Acknowledge)
      if (callback) callback({ status: "ok" });

    } catch (error: any) {
      console.error("❌ Erro ao processar mensagem no socket:", error.message);
      
      if (callback) {
        callback({ status: "error", message: error.message || "Erro interno no servidor de chat" });
      }
    }
  });

  // Evento 3: Desconexão limpa
  socket.on("disconnect", () => {
    console.log(`❌ Usuário desconectado: ${socket.id}`);
  });
});

// Roda o servidor de Sockets na porta 3001
const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`⚡ Servidor de tempo real rodando na porta http://localhost:${PORT}`);
});