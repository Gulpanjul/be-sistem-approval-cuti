import { Response } from "express";
import { prisma } from "../prisma/client";
import { AuthRequest } from "../middleware/auth";
import { Role } from "@prisma/client";

// 🟢 1. Employee submit cuti
export async function submitCuti(req: AuthRequest, res: Response) {
  try {
    const { startDate, endDate, type, reason, attachment } = req.body;

    if (new Date(endDate) < new Date(startDate))
      return res.status(400).json({ error: "Tanggal akhir tidak valid" });

    const cuti = await prisma.cuti.create({
      data: {
        employeeId: req.user!.userId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        type,
        reason,
        attachment,
        status: "pending_head",
      },
    });

    await prisma.cutiHistory.create({
      data: {
        cutiId: cuti.id,
        actorId: req.user!.userId,
        role: req.user!.role as Role,
        action: "submit",
        comment: null,
      },
    });

    res.json(cuti);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Terjadi kesalahan server" });
  }
}

// 🟡 2. List cuti (pagination + filter)
export async function listCuti(req: AuthRequest, res: Response) {
  try {
    const { page = 1, pageSize = 5, status, mine } = req.query as any;
    const skip = (Number(page) - 1) * Number(pageSize);
    const where: any = {};

    if (status) where.status = status;
    if (mine === "true") where.employeeId = req.user!.userId;

    const [data, totalCount] = await Promise.all([
      prisma.cuti.findMany({
        where,
        skip,
        take: Number(pageSize),
        include: { employee: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.cuti.count({ where }),
    ]);

    res.json({
      totalCount,
      totalPages: Math.ceil(totalCount / Number(pageSize)),
      currentPage: Number(page),
      data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengambil data cuti" });
  }
}

// 🔵 3. Detail cuti (termasuk history)
export async function getCutiDetail(req: AuthRequest, res: Response) {
  try {
    const id = Number(req.params.id);
    const cuti = await prisma.cuti.findUnique({
      where: { id },
      include: {
        employee: true,
        histories: { include: { actor: true }, orderBy: { createdAt: "asc" } },
      },
    });

    if (!cuti)
      return res.status(404).json({ error: "Data cuti tidak ditemukan" });
    res.json(cuti);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengambil detail cuti" });
  }
}

// 🟣 4. Employee update cuti (jika revisi)
export async function updateCuti(req: AuthRequest, res: Response) {
  try {
    const id = Number(req.params.id);
    const { startDate, endDate, type, reason, attachment } = req.body;

    const existing = await prisma.cuti.findUnique({ where: { id } });
    if (!existing)
      return res.status(404).json({ error: "Cuti tidak ditemukan" });
    if (existing.employeeId !== req.user!.userId)
      return res
        .status(403)
        .json({ error: "Tidak dapat mengubah pengajuan orang lain" });
    if (existing.status !== "revisi" && existing.status !== "draft")
      return res
        .status(400)
        .json({ error: "Cuti tidak dalam status revisi/draft" });

    const updated = await prisma.cuti.update({
      where: { id },
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        type,
        reason,
        attachment,
        status: "pending_head",
      },
    });

    await prisma.cutiHistory.create({
      data: {
        cutiId: id,
        actorId: req.user!.userId,
        role: req.user!.role as Role,
        action: "update",
      },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal memperbarui cuti" });
  }
}

// 🔴 5. Action Head / GM (approve / reject / request_revision)
export async function actionCuti(req: AuthRequest, res: Response) {
  try {
    const id = Number(req.params.id);
    const { action, comment } = req.body;

    const cuti = await prisma.cuti.findUnique({ where: { id } });
    if (!cuti) return res.status(404).json({ error: "Cuti tidak ditemukan" });

    // 🔐 Validasi role dan status
    if (req.user!.role === "HEAD" && cuti.status !== "pending_head")
      return res.status(400).json({ error: "Cuti bukan untuk Head" });
    if (req.user!.role === "GM" && cuti.status !== "pending_gm")
      return res.status(400).json({ error: "Cuti bukan untuk GM" });

    let newStatus = cuti.status;
    if (action === "approve") {
      if (req.user!.role === "HEAD") newStatus = "pending_gm";
      else if (req.user!.role === "GM") newStatus = "approved";
    } else if (action === "reject") {
      newStatus = "rejected";
    } else if (action === "request_revision") {
      newStatus = "revisi";
    } else {
      return res.status(400).json({ error: "Aksi tidak valid" });
    }

    await prisma.cuti.update({ where: { id }, data: { status: newStatus } });

    await prisma.cutiHistory.create({
      data: {
        cutiId: id,
        actorId: req.user!.userId,
        role: req.user!.role as Role,
        action,
        comment,
      },
    });

    res.json({ message: `Cuti berhasil di-${action}`, newStatus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal memproses aksi" });
  }
}
