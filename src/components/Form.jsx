"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import Order from "./Order";

const ESPECIAL = "clfkrhfbp000ctu1w51lxj0pk";

export default function Form({ platos }) {
  const router = useRouter();
  const [isReset, setIsReset] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const select = useRef(null);
  const isMutating = isFetching;

  async function onSubmit(e) {
    e.preventDefault();
    setIsFetching(true);

    const form = e.currentTarget;
    const title = form.elements.namedItem("title");
    const table = form.elements.namedItem("table");
    const comment = form.elements.namedItem("comment");
    const order = select.current;
    if (!order?.length) {
      alert("No hay platos en la comanda");
      return;
    }
    const priority = order.some((plate) => plate.id === ESPECIAL);
    const orderStringified = JSON.stringify(order);

    setIsReset(true);

    const res = await fetch("/api/comandas", {
      body: JSON.stringify({
        title: title.value,
        table: table.value,
        content: comment?.value,
        priority,
        order: orderStringified,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    title.value = "";
    table.value = "";
    comment.value = "";
    select.current = null;
    const { error } = await res.json();
    console.log(error);

    setIsFetching(false);
    setIsReset(false);
    router.refresh();
  }

  return (
    <form
      style={{ opacity: !isMutating ? 1 : 0.7 }}
      className="relative mx-auto max-w-3xl rounded-lg border border-gray-200 bg-white p-6  shadow"
      onSubmit={onSubmit}
    >
      <div className="mb-6 grid grid-cols-4 gap-6">
        <div className="col-span-3">
          <label
            htmlFor="title"
            className="text-md mb-2 block font-medium text-gray-900"
          >
            Nombre*
          </label>
          <input
            aria-label="Nombre"
            placeholder="Nombre..."
            name="title"
            type="text"
            required
            className="text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
          />
        </div>
        <div className="col-span-1">
          <label
            htmlFor="table"
            className="text-md mb-2 block font-medium text-gray-900"
          >
            Mesa*
          </label>
          <input
            aria-label="Mesa..."
            placeholder="Mesa..."
            name="table"
            type="number"
            required
            className="text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
          />
        </div>
      </div>
      <div className="mb-6">
        <Order ref={select} options={platos} reset={isReset} />
      </div>
      <div className="mb-6">
        <label
          htmlFor="comment"
          className="text-md mb-2 block font-medium text-gray-900"
        >
          Comentario
        </label>
        <textarea
          rows="4"
          aria-label="Comentarios"
          placeholder="Comentarios..."
          name="comment"
          type="textarea"
          required
          className="text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="text-center">
        <button
          className="text-md w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
          disabled={isMutating}
          type="submit"
        >
          Enviar
        </button>
      </div>
    </form>
  );
}
