"use client";

import { usePost } from "../hooks/usePost";
import { COMANDA_KEY, deleteComanda } from "../service/comandas";

export default function Delete({ id }) {
  const mutation = usePost(COMANDA_KEY, deleteComanda);

  async function onClick() {
    const request = { id };
    try {
      await mutation.mutateAsync(request);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      className="w-auto rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800"
      disabled={mutation.isLoading}
      type="button"
      onClick={onClick}
    >
      {mutation.isLoading ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#ffffff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
          <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
          <line x1="12" y1="9" x2="12" y2="12" />
          <line x1="12" y1="15" x2="12.01" y2="15" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#ffffff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
      )}
    </button>
  );
}
