import React, { useEffect, useState } from "react";

export function LevelMap4({ apiData }) {

  const [data, setData] = useState(apiData);

  useEffect(() => {
    setData(apiData);

    return () => {
      setData(null);
    };
  }, [apiData]);

  const backgroundImage = data && data['6'] ? data['6'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'sky Background') : null;
  const LevelMap4gif = data && data['81'] ? data['81'].find((image) => image.key === 'Level Map.gif') : null;

  const backgroundImageStyle = {
    backgroundImage: `url("${backgroundImage?.value || ''}")`,
  };

  return (
    <div className="page-container">
      <div className="background-images" style={backgroundImageStyle}>
        <div className="page-container3">
          {LevelMap4gif && (
            <img
              src={LevelMap4gif.value}
              alt={LevelMap4gif.key}
              className="clock-images"
            />
          )}

        </div>
      </div>
    </div>
  );
}