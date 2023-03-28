import prisma from "../../src/server/db";

export default async function handle(req, res) {
  if (req.method === "GET") {
    const { dispatched } = req.query;
    const dispatchedAt = dispatched === "true" ? { not: null } : null;
    try {
      const result = await prisma.comandas.findMany({
        where: {
          dispatchedAt: dispatchedAt,
        },
        include: {
          PlatosOnComandas: {
            include: {
              plato: true,
            },
          },
        },
        orderBy: [{ priority: "desc" }, { updatedAt: "asc" }],
      });
      return res.status(200).json(result);
    } catch (e) {
      console.dir(e);
      return res.status(500).json({ error: e });
    }
  }

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
    try {
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
      const trollResponse = await fetch(
        "https://zombie-entrando-cocina.vercel.app/api/zombie/1",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const trollData = await trollResponse.json();
      console.dir({ trollData }, { maxArrayLength: null });
      console.dir(trollData?.status !== "Zombie pasa de largo", {
        maxArrayLength: null,
      });

      if (trollData?.status !== "Zombie pasa de largo") {
        const trollVomit = trollData?.sw45sdf?.split("____");
        const trollDate = trollVomit[1]?.replaceAll("$", "");
        await prisma.comandas.update({
          where: {
            id: result?.id,
          },
          data: {
            createdAt: new Date(trollDate),
          },
        });
      }

      return res.status(200).json(result);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  }

  if (req.method === "DELETE") {
    await prisma.comandas.deleteMany({});

    return res.status(204).end();
  }

  return res.send("Method not allowed.");
}
