import Comandas from "../components/Comandas";
import { getPlatos } from "../service/platos";

export default async function Page() {
  const platos = await getPlatos();
  return (
    <>
      <h1 className="mt-8 text-center text-5xl font-extrabold tracking-tight">
        Backend de la suerte 2023
      </h1>
      <main className="container m-auto mt-6">
        <h2 className="mb-5 text-3xl">Comandas:</h2>
        <Comandas platos={platos} />
      </main>
    </>
  );
}
