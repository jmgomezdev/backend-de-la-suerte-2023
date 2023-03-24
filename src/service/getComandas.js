import prisma from "../server/db";

export default async function getComandas() {
  try {
    const data = await prisma.comandas.findMany({
      include: {
        PlatosOnComandas: {
          include: {
            plato: true,
          },
        },
      },
      orderBy: [{ priority: "desc" }, { createdAt: "asc" }],
    });

    return data;
  } catch (error) {
    console.error(error);
  }
  return [];
}
