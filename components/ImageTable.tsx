import React from "react";
import { useTable } from "react-table";
import "./ImageTable.module.css";
import ImageThumbnail from "./ImageThumbnail";

interface ImageTableProps {
  data: { [hash: string]: string[] };
}

const ImageTable: React.FC<ImageTableProps> = ({ data }) => {
  const processData = React.useMemo(() => {
    const formattedData = Object.entries(data).flatMap(([hash, paths]) =>
      paths.map((path) => ({
        hash,
        path,
      }))
    );
    return formattedData;
  }, [data]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Index",
        id: "index",
        Cell: ({ row }) => <span>{row.index + 1}</span>,
      },
      {
        Header: "Thumbnail",
        id: "thumbnail",
        accessor: "path",
        width: 120,
        Cell: ({ value }) => (
          <ImageThumbnail
            src={value}
            alt="Thumbnail"
            width={50}
            height={50}
            onHeicConversionRequired={async (src) => {
              const convertedBuffer = await window.electronAPI.invoke(
                "convert-heic",
                src
              );

              const blob = new Blob([convertedBuffer], {
                type: "image/jpeg",
              });
              return blob;
            }}
          />
        ),
      },
      {
        Header: "Hash",
        accessor: "hash",
      },
      {
        Header: "File Path",
        accessor: "path",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: processData });

  const rowColorClass = (rowIndex, hash) => {
    if (rowIndex === 0) {
      return "blue";
    }

    const previousRow = rows[rowIndex - 1];
    if (previousRow.original.hash === hash) {
      return previousRow.colorClass;
    }

    return previousRow.colorClass === "blue" ? "red" : "blue";
  };

  return (
    <table {...getTableProps()} className="react-table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          row.colorClass = rowColorClass(rowIndex, row.original.hash);
          return (
            <tr {...row.getRowProps()} className={row.colorClass}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ImageTable;
