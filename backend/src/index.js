import express from "express";
import { env } from "./config/environments.js";
import connectDB from "./config/mongodb.js";
import { API } from "./routes/index.js";
import { swaggerDocs } from "./config/swagger.js";
import swaggerUi from "swagger-ui-express";
const app = express();
const PORT = env.PORT;
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/", API);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
