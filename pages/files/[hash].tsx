// pages/files/[hash].tsx
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Gallery from "../../components/ImageGallery";

const HashFiles: React.FC = () => {
  const router = useRouter();
  const { hash } = router.query;
  const [imagePaths, setImagePaths] = useState<string[]>([]);

  useEffect(() => {
    if (hash) {
      // Replace this with a proper API call or the data source you're using
      const data = JSON.parse(localStorage.getItem("deduplicatorData") || "{}");
      const pathsForHash = data[hash as keyof typeof data] || [];
      const imagePathsForHash = pathsForHash
        .filter((path) => {
          const extension = path.split(".").pop()?.toLowerCase();
          return (
            extension === "jpg" ||
            extension === "jpeg" ||
            extension === "png" ||
            extension === "heic"
          );
        })
        .map((path) => {
          console.log("Path: ", path);
          return path;
        });
      setImagePaths(imagePathsForHash);
    }
  }, [hash]);

  return (
    <div>
      <h1>Files with hash: {hash}</h1>
      <Link href="/">
        <button>Go Back</button>
      </Link>
      {imagePaths.length > 0 && <Gallery images={imagePaths} />}
      {imagePaths.length === 0 && <p>No images found for this hash.</p>}
    </div>
  );
};

export default HashFiles;
