export default function Home() {
    return (
        <main
            className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-sans px-6 py-16">
            <div className="max-w-2xl text-center space-y-6">
                <h1 className="text-4xl font-bold">Mini Inbox System</h1>
                <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                    Bem-vindo ao sistema <strong>Mini Inbox</strong>, desenvolvido como parte do teste técnico.
                    <br/>
                    O projeto é composto por um backend em <strong>FastAPI</strong>, um frontend
                    em <strong>Next.js</strong>,
                    e uma automação em <strong>n8n</strong> para integração de eventos.
                </p>

                <section className="bg-white/60 dark:bg-zinc-800/50 rounded-xl p-6 text-left shadow-sm space-y-3">
                    <h2 className="text-2xl font-semibold mb-2">Funcionalidades</h2>
                    <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                        <li>
                            <strong>/tickets</strong> — Lista todos os tickets com busca por texto simples.
                        </li>
                        <li>
                            <strong>/tickets/[id]</strong> — Detalhe de um ticket específico, com botões para alterar
                            <em> status</em> e <em>priority</em>.
                        </li>
                        <li>
                            <strong>/dashboard</strong> — Exibe métricas processadas do dataset Kaggle (quantidade por
                            dia, tópicos e canais).
                        </li>
                    </ul>
                </section>

                <section className="bg-white/60 dark:bg-zinc-800/50 rounded-xl p-6 text-left shadow-sm space-y-3">
                    <h2 className="text-2xl font-semibold mb-2">Como executar</h2>
                    <ol className="list-decimal list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
                        <li>
                            Certifique-se de ter o <strong>Docker</strong> instalado.
                        </li>
                        <li>
                            No diretório raiz do projeto, execute:{" "}
                            <code className="bg-zinc-200 dark:bg-zinc-700 px-2 py-1 rounded">
                                docker compose up --build
                            </code>
                        </li>
                        <li>
                            O sistema iniciará automaticamente:
                            <ul className="list-disc ml-6 mt-1 space-y-1">
                                <li>Backend (FastAPI) na porta <code
                                    className="bg-zinc-200 dark:bg-zinc-700 px-1 rounded">8000</code></li>
                                <li>Frontend (Next.js) na porta <code
                                    className="bg-zinc-200 dark:bg-zinc-700 px-1 rounded">3000</code></li>
                                <li>n8n na porta <code className="bg-zinc-200 dark:bg-zinc-700 px-1 rounded">5678</code>
                                </li>
                            </ul>
                        </li>
                        <li>
                            Acesse a aplicação em:{" "}
                            <code className="bg-zinc-200 dark:bg-zinc-700 px-2 py-1 rounded">
                                http://localhost:3000
                            </code>
                        </li>
                        <li>
                            O n8n receberá automaticamente notificações quando um ticket for <em>closed</em>
                            ou tiver prioridade <em>high</em>.
                        </li>
                    </ol>
                </section>

                <div className="flex justify-center gap-4 pt-4">
                    <a
                        href="/tickets"
                        className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Ver Tickets
                    </a>
                    <a
                        href="/dashboard"
                        className="px-5 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                    >
                        Ver Dashboard
                    </a>
                </div>

                <footer className="pt-10 text-sm text-zinc-500 dark:text-zinc-400">
                    Desenvolvido por <strong>Aramís Silva</strong> — Teste Técnico Stalse (2025)
                </footer>
            </div>
        </main>
    );
}
