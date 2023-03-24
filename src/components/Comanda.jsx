import Delete from "./Delete";

export const datetimeFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

export default function Comanda({ data, order }) {
  return (
    <div className="col-span-6 rounded-lg border border-gray-200 bg-white p-6 shadow xl:col-span-4">
      <span className="flex items-center justify-between">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {data?.title}
        </h5>
        <Delete id={data?.id} />
      </span>
      <div className="ml-3 py-6 px-3">
        <ul>
          {data?.PlatosOnComandas?.map((item) => (
            <li
              key={`${data.id}-${item.id}`}
              className="flex list-disc items-center justify-between"
            >
              <span className="list-item text-sm marker:font-semibold marker:text-blue-700">
                {item?.plato?.name}
              </span>
              <span className="">{item?.quantity}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between">
        <span className=" bold text-xl text-blue-700">{order}</span>
        <time>
          {data?.createdAt &&
            datetimeFormatter.format(new Date(data?.createdAt))}
        </time>
      </div>
    </div>
  );
}
