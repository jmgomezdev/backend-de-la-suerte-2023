"use client";
import { useQuery } from "@tanstack/react-query";
import Comanda from "../components/Comanda";
import DeleteAll from "../components/DeleteAll";
import Form from "../components/Form";
import { COMANDA_KEY, getComandas } from "../service/comandas";
import Dispatch from "./Dispatch";

const checkTrolling = (data) => {
  return data?.map((comanda) => {
    const trolled = comanda.createdAt !== comanda.updatedAt;
    return { ...comanda, trolled };
  });
};

export default function Comandas(props) {
  const { platos } = props;
  const { data, isLoading, isFetching } = useQuery(
    COMANDA_KEY,
    () => getComandas(),
    {
      // onError: async (error, query) => {
      //   const { status, data } = error.response;
      // },
      select: (data) => checkTrolling(data),
      retry: 1,
    }
  );
  return isLoading ? (
    <p>Cargando...</p>
  ) : (
    <>
      <div className="grid grid-cols-12 items-start justify-center gap-5">
        {data?.map((comanda, index) => (
          <Comanda key={comanda.id} data={comanda} order={index + 1} />
        ))}
      </div>
      {data?.length ? (
        <Dispatch />
      ) : (
        <h2 className="mb-5 text-center text-3xl text-blue-700">
          No hay ninguna comanda activa
        </h2>
      )}
      <hr className="mt-12 mb-8" />
      {(data?.length || 0) > 4 ? (
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
    </>
  );
}
