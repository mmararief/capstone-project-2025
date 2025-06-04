const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();
const csvFile = path.join(__dirname, "../../tourism_rating.csv");
const userCsvFile = path.join(__dirname, "../../user.csv");

async function importUsers() {
  // Step 1: Baca mapping User_Id ke Age dari user.csv
  const userAgeMap = {};
  await new Promise((resolve) => {
    fs.createReadStream(userCsvFile)
      .pipe(csv())
      .on("data", (row) => {
        if (row["User_Id"]) {
          const age = row["Age"] ? parseInt(row["Age"]) : null;
          userAgeMap[row["User_Id"]] = age;
        }
      })
      .on("end", resolve);
  });

  // Step 2: Import user dari tourism_rating.csv
  const userIds = new Set();
  fs.createReadStream(csvFile)
    .pipe(csv())
    .on("data", (row) => {
      if (row["User_Id"]) {
        userIds.add(row["User_Id"]);
      }
    })
    .on("end", async () => {
      console.log(`Ditemukan ${userIds.size} user unik.`);
      let inserted = 0;
      for (const userId of userIds) {
        try {
          await prisma.user.upsert({
            where: { id: parseInt(userId) },
            update: {},
            create: {
              id: parseInt(userId),
              name: `User ${userId}`,
              email: `user${userId}@example.com`,
              preferences: [],
              password: "password123",
              age: userAgeMap[userId] ?? null,
            },
          });
          inserted++;
        } catch (err) {
          console.error(`Gagal insert user ${userId}:`, err);
        }
      }
      console.log(`Selesai insert ${inserted} user.`);
      // Reset sequence agar auto increment id user benar
      const { resetUserIdSequence } = require("./resetUserIdSequence");
      await resetUserIdSequence(prisma);
      await prisma.$disconnect();
    });
}

importUsers(); 