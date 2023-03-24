const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userData = [
  {
    name: "Sergi",
    email: "sergi@malandriner.dev",
  },
  {
    name: "Yuri",
    email: "yuri@malandriner.dev",
  },
  {
    name: "Dani",
    email: "dani@malandriner.dev",
  },
];

const platosData = [
  {
    name: "Carrilleras humanas con puré de calabaza y salsa de vísceras",
    price: 32.0,
  },
  { name: "Chuletas de Dedos Humanos", price: 37.0 },
  { name: "Cóctel de Ojo de Humano", price: 12.99 },
  {
    name: "Hígado de bebé a la planca con una reducción de sangre",
    price: 36.0,
  },
  { name: "Muslo de Pollo Podrido a la Mostaza Antigua", price: 32.0 },
  { name: "Raviolis de sesos con salsa al PX", price: 24.5 },
  { name: "Especial zombie", price: 56.99 },
  { name: "Helado de Sangre de Zombi con Salsa de Hueso", price: 14.5 },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  for (const p of platosData) {
    const plato = await prisma.platos.create({
      data: p,
    });
    console.log(`Created plato with id: ${plato.id}`);
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
