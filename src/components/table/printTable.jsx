import { useEffect, useState } from "react";

const PrintTable = ({ data, title, id }) => {
  const [head, setHead] = useState([]);
  useEffect(() => {
    if (data?.length > 0) {
      setHead(Object?.keys(data[0]));
    }
  }, [data]);

  return (
    <div className="overflow-hidden p-10">
      <h2 className="text-gray-500 text-xl pb-5">{title}</h2>
      <table className="table-auto w-full" id={id}>
        <thead>
          <tr className="border border-y-1 border-x-1 border-gray-400 text-gray-500 uppercase text-sm">
            {head?.map((item, index) => {
              return (
                <th
                  className={`text-left py-4 font-medium ${
                    index === 0
                      ? "pl-5"
                      : index === head.length - 1
                      ? "pr-5"
                      : "px-3"
                  }`}
                  key={index}
                >
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => {
            return (
              <tr
                key={index}
                className="border border-y-1 border-x-1 border-gray-400 text-gray-600 text-sm"
              >
                {Object.values(item).map((value, ind) => {
                  return (
                    <td
                      key={ind}
                      className={`py-4 ${
                        ind === 0
                          ? "pl-5 text-primary"
                          : ind === Object.values(item).length - 1
                          ? "pr-5 capitalize"
                          : "px-3 capitalize"
                      }`}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PrintTable;
