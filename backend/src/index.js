import express from "express";
import { env } from "./config/environments.js";
import connectDB from "./config/mongodb.js";
import { API } from "./routes/index.js";
const app = express();
const PORT = env.PORT;
app.use(express.json());
app.use("/", API);
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
