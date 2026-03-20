# 🌦️ Weather App - PM Accelerator AI Engineer Intern Challenge

Este repositório contém o projeto **Weather App Fullstack**, desenvolvido como parte do processo seletivo para a vaga de **AI Engineer Intern** no **PM Accelerator**. O objetivo central é fornecer aos usuários informações meteorológicas em tempo real através de uma interface moderna e segura.

## 📋 Sobre o Projeto

O Weather App é uma solução completa que combina um backend robusto em Node.js com um frontend performático em Next.js. O sistema permite buscar condições climáticas de qualquer cidade, mantendo um histórico de consultas persistido e oferecendo uma experiência visual premium.

### Principais Funcionalidades

- **Busca Global**: Pesquisa por termos de localização (Cidades, Países).
- **Dados Reais**: Integração com a API Open-Meteo para previsões precisas.
- **Histórico Persistente**: Armazenamento de consultas recentes no PostgreSQL.
- **UI Premium**: Interface com Glassmorphism, Skeleton Loaders e design responsivo.
- **Segurança**: Middlewares de proteção (Helmet, Rate Limit, CORS) e validação de dados.
- **Documentação**: API autodocumentada com Swagger.

---

## 🏗️ Estrutura do Monorepo

O projeto está organizado em duas partes principais:

- **[Backend](file:///c:/Users/maual/Downloads/test-PM-Accelerator/backend/README.md)**: API RESTful em Express + Prisma + PostgreSQL. Focado em CRUD, segurança e persistência.
- **[Frontend](file:///c:/Users/maual/Downloads/test-PM-Accelerator/frontend/README.md)**: Aplicação Next.js 16 com Tailwind CSS v4 e Vitest. Focado em UX e visualização de dados.

---

## 🚀 Como Iniciar

### Pré-requisitos
- **Node.js** (v18+)
- **Docker & Docker Compose** (para o banco de dados)

### Passo a Passo Rápido

1. **Clone o repositório**:
   ```bash
   git clone <repo-url>
   cd test-PM-Accelerator
   ```

2. **Inicie o Banco de Dados**:
   ```bash
   docker-compose up -d db
   ```

3. **Configure e rode o Backend**:
   Consulte o [README do Backend](file:///c:/Users/maual/Downloads/test-PM-Accelerator/backend/README.md) para detalhes de instalação e variáveis de ambiente.

4. **Configure e rode o Frontend**:
   Consulte o [README do Frontend](file:///c:/Users/maual/Downloads/test-PM-Accelerator/frontend/README.md) para detalhes de conexão com a API e execução.

---

## 🧪 Qualidade de Código (TDD)

Ambas as camadas do projeto foram desenvolvidas seguindo práticas de **Clean Code** e **TDD**:
- **Backend**: 100% de cobertura no `WeatherService.ts`.
- **Frontend**: >90% de cobertura em componentes, hooks e serviços.

---

## 🤝 PM Accelerator

O **Product Manager Accelerator** é focado em preparar talentos para o mercado de tecnologia, unindo engenharia de IA e gestão de produtos. Este desafio demonstra competências de desenvolvimento fullstack, arquitetura de sistemas e foco no usuário.

---

**Desenvolvido por:** [Maurício Alves](https://www.linkedin.com/in/mauricio-oliveira-alves/) - AI Engineer Intern Candidate
