"use client";

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-900 bg-zinc-900/20 py-4 px-6 md:px-8 text-center md:text-left">
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium">
        <div>
          &copy; {new Date().getFullYear()} Ticketorr. Todos os direitos reservados.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-zinc-300 transition-colors">Suporte</a>
          <a href="#" className="hover:text-zinc-300 transition-colors">Documentação</a>
          <a href="#" className="hover:text-zinc-300 transition-colors">Contato</a>
        </div>
      </div>
    </footer>
  );
}