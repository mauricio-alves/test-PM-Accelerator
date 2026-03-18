# Weather App - Backend

Este é o servidor backend do Weather App, desenvolvido como parte do teste técnico para AI Engineer Intern. O foco deste projeto foi a implementação de uma arquitetura robusta, segura e totalmente testada (TDD).

## 🚀 Tecnologias

- **Node.js & Express:** Framework principal.
- **TypeScript:** Tipagem estrita para maior segurança e manutenibilidade.
- **Prisma ORM:** Interação com o banco de dados PostgreSQL.
- **PostgreSQL:** Banco de dados relacional para persistência de históricos e logs.
- **Vitest:** Framework de testes unitários de alta performance.
- **Swagger (OpenAPI 3.0):** Documentação interativa da API.
- **Docker:** Containerização completa da aplicação e do banco de dados.

## 🛡️ Segurança Implementada

- **Helmet:** Configuração de headers HTTP para proteção contra ataques comuns.
- **Rate Limit:** Proteção contra força bruta e abusos na API.
- **CORS:** Restrição de acesso apenas para o frontend autorizado.
- **Input Validation:** Sanitização e validação rigorosa de parâmetros de busca.
- **Secure Error Handling:** Tratamento de erros que impede o vazamento de informações sensíveis do servidor.

## 📊 Cobertura de Testes

O projeto segue a metodologia TDD (Test Driven Development) com foco no `WeatherService.ts`, atingindo:

- **100% de cobertura de Statements/Lines.**
- **100% de cobertura de Functions.**

## 📖 Documentação da API

A documentação interativa pode ser acessada via Swagger UI após iniciar o servidor:

- **Endpoint:** `http://localhost:3001/api-docs`

## 🛠️ Como Executar

1. **Instalar dependências:**

   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   Crie um arquivo `.env` baseado no `.env.example`.

3. **Subir Banco de Dados (Docker):**

   ```bash
   docker-compose up -d db
   ```

4. **Executar em modo desenvolvimento:**

   ```bash
   npm run dev
   ```

5. **Executar Testes:**

   ```bash
   npm test
   npm test -- --coverage
   ```

6. **Build para Produção:**
   ```bash
   npm run build
   npm start
   ```
