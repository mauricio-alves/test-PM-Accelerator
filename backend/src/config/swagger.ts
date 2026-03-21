import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Weather App API",
      version: "1.0.0",
      description: "API para consulta de clima e histórico de buscas",
      contact: {
        name: "Mauricio",
      },
    },
    servers: [
      {
        url: "http://localhost:3001/api",
        description: "Servidor Local",
      },
    ],
    components: {
      schemas: {
        Weather: {
          type: "object",
          properties: {
            city: { type: "string" },
            temp: { type: "number" },
            description: { type: "string" },
            humidity: { type: "number" },
            windSpeed: { type: "number" },
            icon: { type: "string" },
          },
        },
        History: {
          type: "object",
          properties: {
            id: { type: "string" },
            city: { type: "string" },
            temp: { type: "number" },
            description: { type: "string" },
            humidity: { type: "number" },
            windSpeed: { type: "number" },
            icon: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        SearchLog: {
          type: "object",
          properties: {
            id: { type: "string" },
            query: { type: "string" },
            timestamp: { type: "string", format: "date-time" },
          },
        },
      },
    },
    paths: {
      "/weather": {
        get: {
          summary: "Busca o clima de uma cidade",
          parameters: [
            {
              name: "city",
              in: "query",
              required: true,
              schema: { type: "string" },
              description: "Nome da cidade",
            },
          ],
          responses: {
            200: {
              description: "Sucesso",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Weather" },
                },
              },
            },
            400: { description: "Cidade é obrigatória" },
            404: { description: "Cidade não encontrada" },
            500: { description: "Erro interno" },
          },
        },
      },
      "/history": {
        get: {
          summary: "Lista as últimas 10 consultas persistidas",
          responses: {
            200: {
              description: "Sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/History" },
                  },
                },
              },
            },
            500: { description: "Erro interno" },
          },
        },
        delete: {
          summary: "Limpa todo o histórico de buscas",
          responses: {
            204: { description: "Sucesso (Sem conteúdo)" },
            500: { description: "Erro interno" },
          },
        },
      },
      "/history/{id}": {
        delete: {
          summary: "Exclui um registro específico do histórico",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "ID do registro",
            },
          ],
          responses: {
            204: { description: "Sucesso (Sem conteúdo)" },
            400: { description: "ID é obrigatório" },
            500: { description: "Erro interno" },
          },
        },
      },
      "/logs": {
        get: {
          summary: "Lista os últimos 20 logs de busca",
          responses: {
            200: {
              description: "Sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/SearchLog" },
                  },
                },
              },
            },
            500: { description: "Erro interno" },
          },
        },
      },
      "/export": {
        get: {
          summary: "Exporta o histórico completo",
          parameters: [
            {
              name: "format",
              in: "query",
              required: true,
              schema: { type: "string", enum: ["json", "csv"] },
              description: "Formato do arquivo",
            },
          ],
          responses: {
            200: { description: "Sucesso (Download do arquivo)" },
            400: { description: "Formato inválido" },
            500: { description: "Erro interno" },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
