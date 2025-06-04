const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();
const csvFile = path.join(__dirname, "../../tourism_rating.csv");

async function importRatings() {
  const ratings = [];
  fs.createReadStream(csvFile)
    .pipe(csv())
    .on("data", (row) => {
      if (row["User_Id"] && row["Place_Id"] && row["Place_Ratings"]) {
        ratings.push({
          user_id: parseInt(row["User_Id"]),
          place_id: parseInt(row["Place_Id"]),
          value: parseFloat(row["Place_Ratings"]),
        });
      }
    })
    .on("end", async () => {
      console.log(`Ditemukan ${ratings.length} rating.`);
      let inserted = 0;
      for (const rating of ratings) {
        try {
          await prisma.rating.create({
            data: {
              value: rating.value,
              user: { connect: { id: rating.user_id } },
              place: { connect: { id: rating.place_id } },
            },
          });
          inserted++;
        } catch (err) {
          console.error(`Gagal insert rating:`, rating, err.message);
        }
      }
      console.log(`Selesai insert ${inserted} rating.`);
      await prisma.$disconnect();
    });
}

importRatings(); 