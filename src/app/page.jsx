import Comanda from "../components/Comanda";
import Form from "../components/Form";
import prisma from "../server/db";

async function getComandas() {
  try {
    const data = await prisma.comandas.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
  return [];
}

export default async function Page() {
  const comandas = await getComandas();

  return (
    <>
      <h1 className="mt-8 text-center text-5xl font-extrabold tracking-tight">
        Backend de la suerte 2023
      </h1>
      <main className="container m-auto mt-6">
        <h2 className="mb-5 text-3xl">Comandas:</h2>
        <div className="grid grid-cols-12 items-start justify-center gap-5">
          {comandas?.map((comanda) => (
            <Comanda key={comanda.id} data={comanda} />
          ))}
        </div>
        <hr className="mt-12 mb-8" />
        <h2 className="mb-5 text-3xl">Crear Comanda:</h2>
        <Form />
      </main>
    </>
  );
}
