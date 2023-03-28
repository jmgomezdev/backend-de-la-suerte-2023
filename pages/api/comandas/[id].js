import prisma from "../../../src/server/db";

export default async function handle(req, res) {
  if (req.method === "PUT") {
    const { id } = req.query;
    const { dispatchedAt } = req.body;
    await prisma.comandas.update({
      where: {
        id: id,
      },
      data: {
        dispatchedAt: new Date(dispatchedAt),
      },
    });
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    await prisma.comandas.delete({
      where: { id },
    });

    return res.status(204).end();
  } else {
    return res.send("Method not allowed.");
  }
}
