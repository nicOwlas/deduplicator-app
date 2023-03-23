import React from "react";
import ImageThumbnail from "./ImageThumbnail";

export interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const getNumColumns = (width: number) => {
    if (width >= 1200) {
      return 4;
    } else if (width >= 900) {
      return 3;
    } else if (width >= 600) {
      return 2;
    } else {
      return 1;
    }
  };

  const handleResize = () => {
    const width = window.innerWidth;
    const numColumns = getNumColumns(width);
    setColumns(numColumns);
  };

  React.useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [columns, setColumns] = React.useState(4);
  const columnWidth = 100 / columns;

  const rows: string[][] = [];

  for (let i = 0; i < images.length; i += columns) {
    const row = images.slice(i, i + columns);
    rows.push(row);
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={{ display: "flex", flexBasis: "100%", maxWidth: "100%" }}
        >
          {row.map((image, columnIndex) => (
            <div
              key={image}
              style={{
                boxSizing: "border-box",
                flex: `1 1 ${columnWidth}%`,
                maxWidth: `${columnWidth}%`,
                padding: "5px",
              }}
            >
              <ImageThumbnail
                src={image}
                alt={"An image"}
                width={100}
                height={100}
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
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Gallery;
