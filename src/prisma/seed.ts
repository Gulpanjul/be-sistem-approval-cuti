import { PrismaClient, Role, CutiStatus, CutiType, ActionType } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");
  const pwd = await bcrypt.hash("password123", 10);

  // 🔹 Buat users
  const [employee, head, gm] = await Promise.all([
    prisma.user.upsert({
      where: { username: "employee1" },
      update: {},
      create: {
        username: "employee1",
        password: pwd,
        name: "Employee One",
        role: Role.EMPLOYEE,
      },
    }),
    prisma.user.upsert({
      where: { username: "head1" },
      update: {},
      create: {
        username: "head1",
        password: pwd,
        name: "Head One",
        role: Role.HEAD,
      },
    }),
    prisma.user.upsert({
      where: { username: "gm1" },
      update: {},
      create: {
        username: "gm1",
        password: pwd,
        name: "GM One",
        role: Role.GM,
      },
    }),
  ]);

  // 🔹 Buat dummy pengajuan cuti milik employee1
  const cuti1 = await prisma.cuti.create({
    data: {
      employeeId: employee.id,
      startDate: new Date("2025-11-10"),
      endDate: new Date("2025-11-15"),
      type: CutiType.TAHUNAN,
      reason: "Liburan keluarga",
      attachment: null,
      status: CutiStatus.pending_head,
    },
  });

  const cuti2 = await prisma.cuti.create({
    data: {
      employeeId: employee.id,
      startDate: new Date("2025-12-01"),
      endDate: new Date("2025-12-03"),
      type: CutiType.SAKIT,
      reason: "Demam dan flu",
      attachment: "surat_dokter.pdf",
      status: CutiStatus.approved,
    },
  });

  // 🔹 Tambahkan history untuk masing-masing cuti
  await prisma.cutiHistory.createMany({
    data: [
      {
        cutiId: cuti1.id,
        actorId: employee.id,
        role: Role.EMPLOYEE,
        action: ActionType.submit,
        comment: null,
      },
      {
        cutiId: cuti2.id,
        actorId: employee.id,
        role: Role.EMPLOYEE,
        action: ActionType.submit,
        comment: "Sakit 3 hari, surat dokter terlampir",
      },
      {
        cutiId: cuti2.id,
        actorId: head.id,
        role: Role.HEAD,
        action: ActionType.approve,
        comment: "Disetujui oleh Head",
      },
      {
        cutiId: cuti2.id,
        actorId: gm.id,
        role: Role.GM,
        action: ActionType.approve,
        comment: "Disetujui final oleh GM",
      },
    ],
  });

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
