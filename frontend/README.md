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
- **Dark Mode nativo:** Background `#09090b` com temas dinâmicos baseados no clima (céu limpo vs nublado).
- **Internacionalização (i18n):** Contexto customizado para troca de idiomas (PT/EN) com persistência no LocalStorage. [NEW]
- **Geolocalização:** Busca por coordenadas do navegador com Geocoding reverso (Nominatim). [NEW]
- **Exportação:** Geração dinâmica de arquivos JSON/CSV lado cliente. [NEW]
- **Skeleton Loader:** Animação de carregamento que espelha o layout do card de clima.
- **Micro-animações:** `animate-in fade-in slide-in-from-bottom` e hover effects premium.
- **Ícones dinâmicos:** Emoji mapeado por condição climática e AI Insights traduzidos.
- **Resiliência e UX:** Implementação de **Optimistic UI** (deleção instantânea) com **Rollback automático** em caso de falha de rede, garantindo que a interface nunca fique travada ou inconsistente. [PREMIUM]

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
│       ├── WeatherDashboard/ # Orquestrador principal (Dashboard)
│       ├── WeatherCard/      # Card principal com i18n AI Insights
│       ├── ForecastList/     # Lista de previsão de 5 dias
│       ├── ExtraWidgets/     # Maps e YouTube widgets
│       ├── WeatherCardSkeleton/ # Skeleton loader durante fetch
│       ├── SearchBar/        # Formulário com suporte a Geolocation
│       └── HistoryList/      # Histórico CRUD (Delete/Clear) e Export
├── context/
│   └── LanguageContext.tsx   # Gestão de i18n e persistência [NEW]
├── hooks/
│   └── useWeather.ts         # Lógica de estado, fetch e tratamento de erros
├── services/
│   ├── api.ts                # Instância Axios (com retries no backend)
│   └── weatherService.ts     # Chamadas à API backend
├── utils/                    # Utilitários centralizados [REFAC]
│   ├── dateUtils.ts          # Formatação de datas PT-BR
│   ├── weatherUtils.ts       # Mapeamento de ícone WMO
│   └── translations.ts       # i18n para descrições
└── interfaces/               # Contratos TypeScript separados por arquivo
```

---

## 🧪 Testes e Qualidade

O projeto segue a metodologia TDD com cobertura abrangente:

- **89.79% de Cobertura no Hook Principal (`useWeather`).**
- **80% de Cobertura no `HistoryList` (Interações e Rollback).**
- **100% Cobertura nos utilitários críticos e WeatherCard.**

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
