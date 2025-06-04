const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function resetUserIdSequence(prisma) {
  try {
    // Ambil id terbesar
    const maxUser = await prisma.user.findFirst({
      orderBy: { id: "desc" },
      select: { id: true },
    });
    const maxId = maxUser ? maxUser.id : 0;
    // Jalankan raw SQL untuk reset sequence
    await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"User"', 'id'), ${maxId})`);
    console.log(`Sequence id User di-reset ke ${maxId}`);
  } catch (err) {
    console.error("Gagal reset sequence:", err);
  }
}

module.exports = { resetUserIdSequence }; 