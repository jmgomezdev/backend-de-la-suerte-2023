import Comanda from "../components/Comanda";
import DeleteAll from "../components/DeleteAll";
import Form from "../components/Form";
import getComandas from "../service/getComandas";
import getPlatos from "../service/getPlatos";

export const revalidate = 0;

export default async function Page() {
  const comandas = await getComandas();
  const platos = await getPlatos();
  return (
    <>
      <h1 className="mt-8 text-center text-5xl font-extrabold tracking-tight">
        Backend de la suerte 2023
      </h1>
      <main className="container m-auto mt-6">
        <h2 className="mb-5 text-3xl">Comandas:</h2>
        <div className="grid grid-cols-12 items-start justify-center gap-5">
          {comandas?.map((comanda, index) => (
            <Comanda key={comanda.id} data={comanda} order={index + 1} />
          ))}
        </div>
        <hr className="mt-12 mb-8" />
        {(comandas?.length || 0) > 4 ? (
          <>
            <h2 className="mb-5 text-center text-3xl text-red-700">
              No se pueden crear más comandas
            </h2>
            <DeleteAll />
          </>
        ) : (
          <>
            <h2 className="mb-5 text-3xl">Crear Comanda:</h2>
            <Form platos={platos} />
          </>
        )}
      </main>
    </>
  );
}
