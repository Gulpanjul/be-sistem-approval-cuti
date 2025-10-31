import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "https://gulpanjul-sistem-approval-cuti.vercel.app",
];

const corsAccess = cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"], // <- ini penting
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

export default corsAccess;
