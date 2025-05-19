import { flexRender } from "@tanstack/react-table";
import CardSkeleton from "../card/skeleton";

const Pagination = ({ table }) => {
  return (
    <ul className="px-5 flex sm:gap-2 gap-1.5 items-center text-gray-600">
      <li
        className={`${
          table.getCanPreviousPage() ? "" : ""
        } text-sm hover:bg-gray-300 dark:hover:bg-gray-600 bg-gray-200 dark:bg-dark-600 dark:text-gray-300 cursor-pointer sm:h-10 h-8 sm:w-10 w-8 flex justify-center items-center rounded-md transition`}
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
      >
        First
      </li>

      <li
        className="text-sm hover:bg-gray-300 dark:hover:bg-gray-600 bg-gray-200 dark:bg-dark-600 dark:text-gray-300 cursor-pointer sm:h-10 h-8 sm:w-10 w-8 flex justify-center items-center rounded-md transition"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Prev
      </li>

      {Array.from({ length: table.getPageCount() }, (_, i) => (
        <li
          key={i}
          onClick={() => table.setPageIndex(i)}
          className={`cursor-pointer sm:text-base text-sm rounded-md sm:h-10 h-8 sm:w-10 w-8 flex justify-center items-center transition ${
            table.getState().pagination.pageIndex === i
              ? "bg-primary text-white hover:bg-primaryDark"
              : "bg-gray-200 dark:bg-dark-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {i + 1}
        </li>
      ))}

      <li
        className="text-sm hover:bg-gray-300 dark:hover:bg-gray-600 bg-gray-200 dark:bg-dark-600 dark:text-gray-300 cursor-pointer sm:h-10 h-8 sm:w-10 w-8 flex justify-center items-center rounded-md transition"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </li>

      <li
        className="text-sm hover:bg-gray-300 dark:hover:bg-gray-600 bg-gray-200 dark:bg-dark-600 dark:text-gray-300 cursor-pointer sm:h-10 h-8 sm:w-10 w-8 flex justify-center items-center rounded-md transition"
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
      >
        Last
      </li>
    </ul>
  );
};

const Table = ({ table, isLoading, totalItem = 10 }) => {
  return (
    <div className="overflow-auto">
      <table className="table-auto w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="border border-y-1 border-x-0 border-gray-400 text-gray-500 dark:text-gray-200 uppercase text-sm"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="text-left py-4 px-6 font-medium"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === "asc"
                              ? "Sort ascending"
                              : header.column.getNextSortingOrder() === "desc"
                              ? "Sort descending"
                              : "Clear sort"
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border border-y-1 border-x-0 border-gray-400 text-gray-600 dark:text-gray-300 text-sm"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-4 px-6 whitespace-normal">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}

          {isLoading ? (
            <tr>
              <td colSpan="99">
                <CardSkeleton />
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.length === 0 && (
              <tr className="border border-y-1 border-x-0 border-gray-400 text-gray-600 dark:text-gray-300 text-sm">
                <td
                  colSpan="99"
                  className="py-4 px-3 uppercase text-center font-semibold"
                >
                  Data is not found
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <div className="py-6">
        {totalItem > 10 && <Pagination table={table} />}
      </div>
    </div>
  );
};

export default Table;
