import prisma from "../../../src/server/db";

export default async function handle(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.query;
    await prisma.comandas.delete({
      where: { id },
    });

    return res.status(204).end();
  }

  return res.send("Method not allowed.");
}
