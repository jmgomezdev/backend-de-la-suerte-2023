const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userData = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    comandas: {
      create: [
        {
          title: "Comanda 1",
          content: "Una de chopitos",
          published: true,
        },
      ],
    },
  },
  {
    name: "Nilu",
    email: "nilu@prisma.io",
    comandas: {
      create: [
        {
          title: "Comanda 2",
          content: "Dos de rabas",
          published: true,
        },
      ],
    },
  },
  {
    name: "Mahmoud",
    email: "mahmoud@prisma.io",
    comandas: {
      create: [
        {
          title: "Comanda 3",
          content: "Tres de pulpo",
          published: true,
        },
        {
          title: "Comanda 4",
          content: "Cuatro de cazón en adobo",
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
