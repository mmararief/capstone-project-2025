const { PrismaClient } = require("../src/generated/prisma");
const prisma = new PrismaClient();

async function main() {
  // Buat beberapa tempat wisata
  const places = await prisma.place.createMany({
    data: [
      {
        name: "Candi Borobudur",
        description:
          "Candi Buddha terbesar di dunia yang terletak di Magelang.",
        category: "Budaya",
        latitude: -7.6079,
        longitude: 110.2038,
        price: 50000,
        image_url: "https://example.com/borobudur.jpg",
      },
      {
        name: "Pantai Kuta",
        description:
          "Pantai terkenal di Bali dengan pemandangan matahari terbenam.",
        category: "Alam",
        latitude: -8.7177,
        longitude: 115.1682,
        price: 25000,
        image_url: "https://example.com/kuta.jpg",
      },
      {
        name: "Taman Mini Indonesia Indah",
        description:
          "Taman budaya yang mewakili kebudayaan Indonesia dari Sabang sampai Merauke.",
        category: "Budaya",
        latitude: -6.3026,
        longitude: 106.8956,
        price: 30000,
        image_url: "https://example.com/tmii.jpg",
      },
      {
        name: "Gunung Bromo",
        description:
          "Gunung berapi aktif dan tempat wisata alam di Jawa Timur.",
        category: "Alam",
        latitude: -7.9425,
        longitude: 112.953,
        price: 40000,
        image_url: "https://example.com/bromo.jpg",
      },
    ],
  });

  console.log("Seeded places:", places.count);

  // Buat user dummy
  const hashedPassword = await require("bcrypt").hash("password123", 10);

  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
      preferences: ["Budaya", "Alam"],
    },
  });

  console.log("Seeded user:", user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
