import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import weatherRoutes from "./routes/weatherRoutes.js";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(helmet());
app.use(limiter);
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS"],
  }),
);
app.use(express.json());

app.use("/api", weatherRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
