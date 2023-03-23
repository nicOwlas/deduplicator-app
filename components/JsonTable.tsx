import Link from "next/link";
import React from "react";

interface JsonTableProps {
  data: { [hash: string]: string[] };
}

const JsonTable: React.FC<JsonTableProps> = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Hash</th>
          <th>Items</th>
          <th>Path</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([hash, paths]) => (
          <tr key={hash}>
            <td>
              <Link href={`/files/${hash}`}>{hash}</Link>
            </td>
            <td>{paths.length}</td>
            <td>{paths[0]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JsonTable;
