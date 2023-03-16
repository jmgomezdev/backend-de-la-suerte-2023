import Delete from "./Delete";

export const datetimeFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

export default function Comanda({ data }) {
  return (
    <div className="col-span-6 max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow xl:col-span-3">
      <span className="flex items-center justify-between">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {data?.title}
        </h5>
        <Delete id={data?.id} />
      </span>
      <p className="mb-3 font-normal text-gray-700">{data?.content}</p>
      <time>
        {data?.createdAt && datetimeFormatter.format(new Date(data?.createdAt))}
      </time>
    </div>
  );
}
