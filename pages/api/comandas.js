import prisma from "../../src/server/db";

export default async function handle(req, res) {
  if (req.method === "POST") {
    const { title, content } = req.body;
    const result = await prisma.comandas.create({
      data: {
        authorId: "clfas4b1r0000tubg486nwhzb",
        title: title,
        content: content,
      },
    });
    res.status(200).json(result);
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    await prisma.comandas.delete({
      where: { id },
    });

    return res.status(204).end();
  }

  return res.send("Method not allowed.");
}
