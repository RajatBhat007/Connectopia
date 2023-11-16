import React, { useEffect, useState } from "react";

export function LevelMap3({ apiData }) {

  const [data, setData] = useState(apiData);

  useEffect(() => {
    setData(apiData);

    return () => {
      setData(null);
    };
  }, [apiData]);

  const backgroundImage = data && data['6'] ? data['6'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'sky Background') : null;
  const LevelMap3gif = data && data['61'] ? data['61'].find((image) => image.key === 'Level Map.gif') : null;

  const backgroundImageStyle = {
    backgroundImage: `url("${backgroundImage?.value || ''}")`,
  };

  return (
    <div className="page-container">
      <div className="background-images" style={backgroundImageStyle}>
        <div className="page-container3">

          {LevelMap3gif && (
            <img
              src={LevelMap3gif.value}
              alt={LevelMap3gif.key}
              className="clock-images"
            />
          )}
        </div>
      </div>
    </div>
  );
}