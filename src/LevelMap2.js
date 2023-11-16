import React, { useEffect, useState } from "react";

export function LevelMap2({ apiData }) {

  const [data, setData] = useState(apiData);

  useEffect(() => {
    setData(apiData);

    return () => {
      setData(null);
    };
  }, [apiData]);

  const backgroundImage = data && data['6'] ? data['6'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'sky Background') : null;
  const LevelMap2gif = data && data['41'] ? data['41'].find((image) => image.key === 'Level Map.gif') : null;

  const backgroundImageStyle = {
    backgroundImage: `url("${backgroundImage?.value || ''}")`,
  };

  return (
    <div className="page-container">
      <div className="background-images" style={backgroundImageStyle}>
        <div className="page-container3">

          {LevelMap2gif && (
            <img
              src={LevelMap2gif.value}
              alt={LevelMap2gif.key}
              className="clock-images"
            />
          )}
        </div>
      </div>
    </div>
  );
}
