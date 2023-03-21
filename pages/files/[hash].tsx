// pages/files/[hash].tsx
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FileList from "../../components/FileList";

const HashFiles: React.FC = () => {
  const router = useRouter();
  const { hash } = router.query;
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("deduplicatorData")));
    if (hash) {
      // Replace this with a proper API call or the data source you're using
      const data = JSON.parse(localStorage.getItem("deduplicatorData") || "{}");
      const pathsForHash = data[hash] || [];
      setPaths(pathsForHash);
    }
  }, [hash]);

  return (
    <div>
      <h1>Files with hash: {hash}</h1>
      <FileList paths={paths} />
    </div>
  );
};

export default HashFiles;
