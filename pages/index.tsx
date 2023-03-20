import { promises as fs } from "fs";
import { GetStaticProps } from "next";
import path from "path";

type ImageData = {
  [key: string]: string[];
};

type ImageDataRow = {
  hash: string;
  numImages: number;
  firstImagePath: string;
};

type Props = {
  imageRows: ImageDataRow[];
};

function IndexPage({ imageRows }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Hash</th>
          <th>Num Images</th>
          <th>First Image Path</th>
        </tr>
      </thead>
      <tbody>
        {imageRows.map((row) => (
          <tr key={row.hash}>
            <td>{row.hash}</td>
            <td>{row.numImages}</td>
            <td>{row.firstImagePath}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default IndexPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const dataFilePath = path.join(process.cwd(), "public", "data.json");
  const data = JSON.parse(
    await fs.readFile(dataFilePath, "utf-8")
  ) as ImageData;

  const imageRows: ImageDataRow[] = Object.entries(data).map(
    ([hash, images]) => {
      const numImages = images.length;
      const firstImagePath = images[0];

      return { hash, numImages, firstImagePath };
    }
  );

  return { props: { imageRows } };
};
