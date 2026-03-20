# 🌦️ Weather App - PM Accelerator AI Engineer Intern Challenge

Este repositório contém o projeto **Weather App Fullstack**, desenvolvido como parte do processo seletivo para a vaga de **AI Engineer Intern** no **PM Accelerator**. O objetivo central é fornecer aos usuários informações meteorológicas em tempo real através de uma interface moderna e segura.

## 📋 Sobre o Projeto

O Weather App é uma solução completa que combina um backend robusto em Node.js com um frontend performático em Next.js. O sistema permite buscar condições climáticas de qualquer cidade, mantendo um histórico de consultas persistido e oferecendo uma experiência visual premium.

### Principais Funcionalidades

- **Busca Global**: Pesquisa por termos de localização (Cidades, Países).
- **Previsão Avançada**: Exibição detalhada das condições atuais e **previsão para os próximos 5 dias**.
- **IA & Recomendações**: Camada de inteligência que sugere atividades e vestimenta com base no clima.
- **Widgets Dinâmicos**: Integração com Google Maps e buscas automáticas no YouTube para a cidade.
- **Histórico & Logs**: Persistência de consultas recentes e termos buscados no PostgreSQL.
- **UI Premium**: Interface Glassmorphism com Skeleton Loaders e animações fluidas.
- **Resiliência**: Backend com **Axios Retries** e cliente Prisma otimizado (Singleton).
- **Segurança**: Proteção com Helmet, Rate Limit, CORS e documentação Swagger (/api-docs).

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

2. **Inicie o Projeto via Docker (Stack Completa)**:

   ```bash
   docker-compose up -d
   ```

   _Isso subirá o Backend (3001), Frontend (3000) e o Banco de Dados (5432)._

3. **Configure e rode o Backend**:
   Consulte o [README do Backend](file:///c:/Users/maual/Downloads/test-PM-Accelerator/backend/README.md) para detalhes de instalação e variáveis de ambiente.

4. **Configure e rode o Frontend**:
   Consulte o [README do Frontend](file:///c:/Users/maual/Downloads/test-PM-Accelerator/frontend/README.md) para detalhes de conexão com a API e execução.

---

## 🧪 Qualidade de Código (TDD)

Ambas as camadas do projeto foram desenvolvidas seguindo práticas de **Clean Code**, **SOLID** e **TDD**:

- **Backend**: ~90% de cobertura no `WeatherService.ts`.
- **Frontend**: >84% de cobertura global (incluindo Suíte de Utils e Componentes).

---

## 🤝 PM Accelerator

O **Product Manager Accelerator** é focado em preparar talentos para o mercado de tecnologia, unindo engenharia de IA e gestão de produtos. Este desafio demonstra competências de desenvolvimento fullstack, arquitetura de sistemas e foco no usuário.

---

**Desenvolvido por:** [Maurício Alves](https://www.linkedin.com/in/mauricio-oliveira-alves/) - AI Engineer Intern Candidate
