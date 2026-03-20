# Weather App - Backend

Este é o servidor backend do Weather App, desenvolvido como parte do teste técnico para AI Engineer Intern. O foco deste projeto foi a implementação de uma arquitetura robusta, segura e totalmente testada (TDD).

## 🚀 Tecnologias

- **Node.js & Express:** Framework principal.
- **TypeScript:** Tipagem estrita para segurança e manutenibilidade.
- **Prisma ORM:** Interação com o banco de dados PostgreSQL.
- **PostgreSQL:** Banco de dados relacional (Docker) para persistência de históricos e logs.
- **Vitest:** Framework de testes unitários.
- **Swagger (OpenAPI 3.0):** Documentação interativa da API.
- **Docker:** Containerização para o banco de dados e ambiente.
- **Open-Meteo API:** Fonte de dados climáticos (Geocoding e Previsão) open-source.
- **tsx:** Execução e monitoramento de arquivos TypeScript em tempo real.

## 🛡️ Segurança Implementada

- **Helmet:** Proteção de headers HTTP.
- **Rate Limit:** Proteção contra abusos e força bruta.
- **CORS:** Restrição de acesso ao frontend autorizado.
- **Validation**: Validação rigorosa de parâmetros de entrada.

## 🛠️ Como Executar

Siga estas etapas na ordem exata para garantir o funcionamento correto:

1. **Instalar dependências:**
   Dentro da pasta `backend`, execute:

   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   Crie um arquivo `.env` na pasta `backend` baseado no `.env.example`:

   ```bash
   cp .env.example .env
   ```

   _Nota: Certifique-se de ajustar as credenciais conforme seu ambiente._

3. **Subir o Banco de Dados (Docker):**
   Na **raiz do projeto** (onde está o arquivo `docker-compose.yml`), execute:

   ```bash
   docker-compose up -d db
   ```

4. **Preparar o Banco de Dados (Prisma):**
   De volta à pasta `backend`, gere o cliente e sincronize o schema:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Iniciar o Servidor em Desenvolvimento:**
   ```bash
   npm run dev
   ```
   O servidor estará ativo em: `http://localhost:3001`

---

## 📖 Documentação da API

A documentação interativa completa pode ser acessada em: `http://localhost:3001/api-docs`

### Endpoints Disponíveis:

#### 1. `GET /api/weather`

- **Descrição:** Busca os dados climáticos atuais, previsão de 5 dias e recomendações de IA.
- **Parâmetros:** `city` (string, mandatório).
- **Retorno:** Objeto contendo `temp`, `description`, `forecast[]` e `recommendation`.

#### 2. `GET /api/history`

- **Descrição:** Retorna o histórico das últimas previsões consultadas.
- **Retorno:** Lista dos últimos 10 registros salvos no banco de dados, ordenados pelo mais recente.

#### 3. `GET /api/logs`

- **Descrição:** Retorna os logs de termos pesquisados pelos usuários.
- **Retorno:** Lista das últimas 20 consultas realizadas (apenas o termo e o timestamp).

---

## 🧪 Testes e Qualidade (Opcional)

O projeto segue a metodologia TDD (Test Driven Development) com foco no `WeatherService.ts`, atingindo:

- **~90% de cobertura de Statements/Lines.**
- **100% de cobertura nos utilitários críticos.**

Para rodar os testes:

```bash
npm test
```

Para ver a cobertura de código:

```bash
npm test -- --coverage
```

## 🏗️ Build para Produção

```bash
npm run build
npm start
```
