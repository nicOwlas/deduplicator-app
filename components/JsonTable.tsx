import Link from "next/link";
import React from "react";

interface JsonTableProps {
  data: { [hash: string]: string[] };
  directoryPath: string;
}

const JsonTable: React.FC<JsonTableProps> = ({ data, directoryPath }) => {
  const getPrefixedPath = (path: string) => {
    return directoryPath ? `${directoryPath}/${path}` : path;
  };
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
            <td>{getPrefixedPath(paths[0])}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JsonTable;
