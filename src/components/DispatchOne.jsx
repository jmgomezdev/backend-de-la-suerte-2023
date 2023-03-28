"use client";
import { usePost } from "../hooks/usePost";
import { COMANDA_KEY, putComanda } from "../service/comandas";

export default function DispatchOne({ id }) {
  const mutation = usePost(COMANDA_KEY, putComanda);

  async function onClick() {
    const request = { id, dispatchedAt: new Date() };
    try {
      await mutation.mutateAsync(request);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      className="w-auto rounded-lg bg-blue-700 p-2 text-center text-sm font-medium text-white hover:bg-blue-800"
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
          <path d="M5 12l5 5l10 -10" />
        </svg>
      )}
    </button>
  );
}
