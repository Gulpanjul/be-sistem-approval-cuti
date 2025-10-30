import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route";
import cutiRoutes from "./routes/cuti.route";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/cuti", cutiRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
