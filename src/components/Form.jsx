"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function Form() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;

  async function onSubmit(e) {
    e.preventDefault();
    setIsFetching(true);

    const form = e.currentTarget;
    const title = form.elements.namedItem("title");
    const content = form.elements.namedItem("content");

    const res = await fetch("/api/comandas", {
      body: JSON.stringify({
        title: title.value,
        content: content.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    title.value = "";
    content.value = "";
    const { error } = await res.json();
    console.log(error);

    setIsFetching(false);
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  }

  return (
    <form
      style={{ opacity: !isMutating ? 1 : 0.7 }}
      className="relative mx-auto max-w-[500px] rounded-lg border border-gray-200 bg-white p-6  shadow"
      onSubmit={onSubmit}
    >
      <div className="mb-6">
        <label
          htmlFor="email"
          className="text-gray-90 text-md mb-2 block font-medium"
        >
          Título
        </label>
        <input
          aria-label="Comanda..."
          placeholder="Comanda..."
          disabled={isPending}
          name="title"
          type="text"
          required
          className="text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="text-gray-90 text-md mb-2 block font-medium"
        >
          Contenido
        </label>
        <input
          aria-label="Comida"
          placeholder="Comida..."
          disabled={isPending}
          name="content"
          type="text"
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
