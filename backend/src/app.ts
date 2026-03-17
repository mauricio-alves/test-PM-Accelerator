import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weatherRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", weatherRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
