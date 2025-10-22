import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import orgRouter from "./routes/organization.routes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Backend is running! 🚀"));

app.use("/users", userRouter);
app.use("/org", orgRouter);

sequelize.sync().then(() => {
  console.log("✅ Database synced");
  app.listen(5000, () => console.log("🚀 Server running on port 5000"));
});
