import cors from "cors";

const corsAccess = cors({
  origin: ["http://localhost:5173", "https://gulpanjul-sistem-approval-cuti.vercel.app"],
  credentials: true,
});

export default corsAccess;
