import express from "express";
import authRoutes from "./routes/auth.route";
import cutiRoutes from "./routes/cuti.route";
import corsAccess from "./middleware/cors";

const app = express();

app.use(corsAccess);
app.options("*", corsAccess);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/cuti", cutiRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
