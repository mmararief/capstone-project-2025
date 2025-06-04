const { PrismaClient } = require("../generated/prisma");
const { Parser } = require("json2csv");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function exportTableToCSV(tableName, data) {
  if (!data.length) {
    console.log(`Tidak ada data di tabel ${tableName}.`);
    return;
  }
  const parser = new Parser();
  const csv = parser.parse(data);
  const exportDir = path.join(__dirname, "../../export");
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir);
  }
  fs.writeFileSync(path.join(exportDir, `${tableName}.csv`), csv);
  console.log(`Export selesai! Data disimpan di export/${tableName}.csv`);
}

async function exportAllTables() {
  try {
    const users = await prisma.user.findMany();
    await exportTableToCSV("users", users);

    const places = await prisma.place.findMany();
    await exportTableToCSV("places", places);

    const ratings = await prisma.rating.findMany();
    await exportTableToCSV("ratings", ratings);
  } catch (err) {
    console.error("Gagal export:", err);
  } finally {
    await prisma.$disconnect();
  }
}

exportAllTables(); 