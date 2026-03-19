# Weather App - Frontend

Este é o cliente frontend do Weather App, desenvolvido como parte do teste técnico para AI Engineer Intern. O foco deste projeto foi a implementação de uma interface moderna com glassmorphism, arquitetura baseada em componentes e cobertura de testes robusta.

## 🚀 Tecnologias

- **Next.js 16 (App Router):** Framework React com SSR e Turbopack.
- **TypeScript:** Tipagem estrita para segurança e manutenibilidade.
- **Tailwind CSS v4:** Estilização utilitária com design system customizado.
- **Axios:** Cliente HTTP para consumo da API backend.
- **Vitest + Testing Library:** Framework de testes unitários e de componentes.

## 🎨 Design

- **Glassmorphism:** Cards com `backdrop-blur`, bordas translúcidas e sombras suaves.
- **Dark Mode nativo:** Background `#09090b` com radial gradient.
- **Skeleton Loader:** Animação de carregamento que espelha o layout do card de clima.
- **Micro-animações:** `animate-in fade-in slide-in-from-bottom` para transições fluidas.
- **Ícones dinâmicos:** Emoji mapeado por condição climática (chuva, neve, sol, etc).

## 🛠️ Como Executar

1. **Instalar dependências:**
   Dentro da pasta `frontend`, execute:

   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   Crie um arquivo `.env` na pasta `frontend` baseado no `.env.example`:

   ```bash
   cp .env.example .env
   ```

   _A variável `NEXT_PUBLIC_API_URL` deve apontar para o servidor backend (padrão: `http://localhost:3001`)._

3. **Certifique-se de que o backend está ativo:**
   O frontend consome a API em `http://localhost:3001`. Siga o README do backend para iniciá-lo.

4. **Iniciar em Desenvolvimento:**
   ```bash
   npm run dev
   ```
   A aplicação estará disponível em: `http://localhost:3000`

---

## 🧩 Arquitetura

```
src/
├── app/              # Layout raiz e página principal (Next.js App Router)
├── components/
│   ├── layout/
│   │   └── GlassContainer/   # Componente base reutilizável (glassmorphism)
│   └── weather/
│       ├── WeatherDashboard/ # Orquestrador principal
│       ├── WeatherCard/      # Card de clima com ícone dinâmico
│       ├── WeatherCardSkeleton/ # Skeleton loader durante fetch
│       ├── SearchBar/        # Formulário de busca
│       └── HistoryList/      # Histórico de buscas recentes
├── hooks/
│   └── useWeather.ts         # Lógica de estado, fetch e tratamento de erros
├── services/
│   ├── api.ts                # Instância Axios configurada
│   └── weatherService.ts     # Chamadas à API backend
└── interfaces/               # Contratos TypeScript (Weather, WeatherRecord)
```

---

## 🧪 Testes e Qualidade

O projeto segue a metodologia TDD com cobertura abrangente de componentes, hooks e serviços, atingindo:

- **91.52% de Statements.**
- **100% de Functions.**

Para rodar os testes:

```bash
npm test
```

Para ver a cobertura de código:

```bash
npm run test:coverage
```

## 🏗️ Build para Produção

```bash
npm run build
npm start
```
