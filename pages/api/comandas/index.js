import prisma from "../../../src/server/db";

export default async function handle(req, res) {
  if (req.method === "POST") {
    const { title, table, comment, order, priority } = req.body;
    // TODO: add validation
    const orderParsed = JSON.parse(order);
    const orderData = orderParsed?.map((item) => ({
      quantity: item.quantity,
      plato: {
        connect: {
          id: item.id,
        },
      },
    }));
    const result = await prisma.comandas.create({
      data: {
        title: title,
        table: Number(table),
        comment: comment,
        priority: priority,
        PlatosOnComandas: {
          create: orderData,
        },
      },
    });

    res.status(200).json(result);
  }

  if (req.method === "DELETE") {
    await prisma.comandas.deleteMany({});

    return res.status(204).end();
  }

  return res.send("Method not allowed.");
}
