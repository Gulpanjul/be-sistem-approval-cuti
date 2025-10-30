import express from "express";
import { authenticate } from "../middleware/auth";
import { requireRole } from "../middleware/rbac";
import * as cutiController from "../controllers/cuti.controller";

const router = express.Router();

// Employee submit cuti
router.post(
  "/",
  authenticate,
  requireRole("EMPLOYEE"),
  cutiController.submitCuti
);

// list cuti (pagination)
router.get("/", authenticate, cutiController.listCuti);

// detail cuti
router.get("/:id", authenticate, cutiController.getCutiDetail);

// employee update cuti (if revision)
router.put(
  "/:id",
  authenticate,
  requireRole("EMPLOYEE"),
  cutiController.updateCuti
);

// Head/GM take action
router.post(
  "/:id/action",
  authenticate,
  requireRole("HEAD", "GM"),
  cutiController.actionCuti
);

export default router;
