import { promises as fs } from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import path from "path";

type ImageData = {
  [key: string]: string[];
};

type Props = {
  hash: string;
  imagePaths: string[];
};

function ImagesPage({ hash, imagePaths }: Props) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div>
      <h1>Images for hash "{hash}"</h1>
      <button onClick={handleGoBack}>Go Back</button>
      <ul>
        {imagePaths.map((path) => (
          <li key={path}>{path}</li>
        ))}
      </ul>
    </div>
  );
}

export default ImagesPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const dataFilePath = path.join(process.cwd(), "public", "data.json");
  const data = JSON.parse(
    await fs.readFile(dataFilePath, "utf-8")
  ) as ImageData;

  const paths = Object.keys(data).map((hash) => ({ params: { hash } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const dataFilePath = path.join(process.cwd(), "public", "data.json");
  const data = JSON.parse(
    await fs.readFile(dataFilePath, "utf-8")
  ) as ImageData;

  const hash = params?.hash as string;
  const imagePaths = data[hash];

  return { props: { hash, imagePaths } };
};
