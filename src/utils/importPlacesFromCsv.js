const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();
const csvFile = path.join(__dirname, "../../tourism_jakarta_with_images (1).csv");

async function importPlaces() {
  const places = [];
  fs.createReadStream(csvFile)
    .pipe(csv())
    .on("data", (row) => {
      // Map kolom CSV ke field Place
      places.push({
        id: parseInt(row["Place_Id"]),
        name: row["Place_Name"],
        description: row["Description"],
        category: row["Category"],
        latitude: parseFloat(row["Lat"]),
        longitude: parseFloat(row["Long"]),
        price: parseFloat(row["Price"]) || 0,
        image_url: row["Image_URL"] || "",
      });
    })
    .on("end", async () => {
      try {
        await prisma.place.deleteMany();
        for (const place of places) {
          // Cek data minimal
          if (!place.name || !place.description || isNaN(place.latitude) || isNaN(place.longitude)) continue;
          await prisma.place.create({ data: place });
        }
        console.log(`Import selesai! ${places.length} tempat di-proses.`);
      } catch (err) {
        console.error("Gagal import:", err);
      } finally {
        await prisma.$disconnect();
      }
    });
}

importPlaces(); 