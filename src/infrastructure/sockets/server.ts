// src/infrastructure/sockets/server.ts
import { createServer } from "http";
import { Server } from "socket.io";
import { enviarMensagemUseCase } from "@/modules/tickets/use-cases/EnviarMensagemUseCase";
import { EnviarMensagemSchema } from "@/modules/tickets/dto/MensagemEnviadaDto";
import { autenticarUsuarioSocketUseCase } from "@/modules/auth/use-cases/autenticate-user-socket.use-case";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"],
  },
});

console.log("🚀 Servidor Socket.io inicializado e aguardando conexões...");

// 🌟 MIDDLEWARE DE INTEGRIDADE: Roda no aperto de mão (handshake)
io.use(async (socket, next) => {
  try {
    const usuarioId = socket.handshake.auth?.usuarioId;

    if (!usuarioId) {
      console.warn("⚠️ Tentativa de conexão sem ID de usuário rejeitada.");
      return next(new Error("Autenticação necessária: ID ausente."));
    }

    // Busca os dados do usuário usando o Caso de Uso isolado
    const usuario = await autenticarUsuarioSocketUseCase(usuarioId);

    if (usuario) {
      // Gravação segura na memória do socket usando chaves unificadas (name, role)
      socket.data.user = {
        id: usuario.id,
        name: usuario.name || "Usuário",
        role: usuario.role || "CLIENTE",
      };
      return next(); // Libera o acesso para o listener de conexões
    }

    console.warn(`⚠️ Usuário com ID ${usuarioId} não foi encontrado no banco.`);
    return next(new Error("Usuário inválido ou não cadastrado."));
  } catch (error: any) {
    console.error("❌ Erro fatal no middleware do Socket:", error.message);
    return next(new Error("Erro interno na validação do aperto de mão."));
  }
});

// 🔌 CONEXÃO ESTÁVEL: Executada após passar com sucesso pelo middleware acima
io.on("connection", (socket) => {
  const nomeUsuarioLogado = socket.data?.user?.name || "Usuário";
  console.log(`👤 Conexão estabelecida e autenticada para: ${nomeUsuarioLogado} (${socket.id})`);

  socket.on("entrar_chamado", ({ ticketId }) => {
    try {
      if (!ticketId) {
        console.warn(`⚠️ Tentativa de entrar em sala com ticketId inválido por [${nomeUsuarioLogado}]`);
        return;
      }
      
      // Vincula fisicamente o socket a esta sala de transmissão
      socket.join(ticketId); 
      console.log(`📺 Usuário [${nomeUsuarioLogado}] entrou na sala do chamado: ${ticketId}`);
    } catch (error: any) {
      console.error("❌ Erro ao processar entrada na sala:", error.message);
    }
  });

  // Evento: Receber mensagem do front-end e propagar via Broadcast
  socket.on("enviar_mensagem", async (payload, callback) => {
    try {
      // 1. Validação imediata com o Zod na porta de entrada
      const dadosValidados = EnviarMensagemSchema.parse(payload);

      // 2. Persiste a mensagem de forma assíncrona no SQLite
      const resultadoBanco = await enviarMensagemUseCase(dadosValidados);

      // 3. BLINDAGEM DO BROADCAST: Monta o formato idêntico ao histórico em inglês (name, role)
      const novaMensagemFormatada = {
        id: resultadoBanco.id,
        conteudo: resultadoBanco.conteudo,
        criadoEm: resultadoBanco.criadoEm || new Date().toISOString(),
        remetente: {
          id: dadosValidados.remetenteId, 
          name: socket.data?.user?.name || "Usuário", // Proteção contra undefined (impede o crash)
          role: socket.data?.user?.role || "CLIENTE", // Proteção contra undefined (impede o crash)
        },
      };

      // Log preventivo no terminal para fins de debug rápido
      console.log(`✈️ Transmitindo mensagem de [${novaMensagemFormatada.remetente.name}] na sala [${dadosValidados.ticketId}]: "${novaMensagemFormatada.conteudo}"`);

      // 4. Distribui em tempo real para todos sintonizados na sala do ticket
      io.to(dadosValidados.ticketId).emit("receber_mensagem", novaMensagemFormatada);

      // 5. Confirmação opcional para o front-end saber que deu tudo certo
      if (callback) callback({ status: "ok" });
    } catch (error: any) {
      console.error("❌ Erro ao processar envio de mensagem no socket:", error.message);
      if (callback) {
        callback({
          status: "error",
          message: error.message || "Erro interno ao processar a mensagem",
        });
      }
    }
  });

  // Evento: Desconexão limpa da aba do navegador
  socket.on("disconnect", () => {
    const nomeDesconectado = socket.data?.user?.name || "Desconhecido";
    console.log(`❌ Usuário desconectado do barramento físico: ${nomeDesconectado} (${socket.id})`);
  });
});

// Roda o servidor isolado de Sockets na porta 3001
const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`⚡ Servidor de tempo real rodando estavelmente em http://localhost:${PORT}`);
});