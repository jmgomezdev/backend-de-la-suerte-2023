import prisma from "../server/db";

export async function getPlatos() {
  try {
    const data = await prisma.platos.findMany({
      orderBy: {
        name: "asc",
      },
    });
    const options = data.map((plato) => ({
      value: plato.id,
      label: plato.name,
    }));
    return options;
  } catch (error) {
    console.error(error);
  }
  return [];
}
