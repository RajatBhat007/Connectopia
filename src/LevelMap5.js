import React, { useEffect, useState } from "react";

export function LevelMap5({ apiData }) {

  const [data, setData] = useState(apiData);

  useEffect(() => {
    setData(apiData);

    return () => {
      setData(null);
    };
  }, [apiData]);

  const backgroundImage = data && data['6'] ? data['6'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'sky Background') : null;
  const LevelMap5gif = data && data['101'] ? data['101'].find((image) => image.key === 'Level Map.gif') : null;

  const backgroundImageStyle = {
    backgroundImage: `url("${backgroundImage?.value || ''}")`,
  };

  return (
    <div className="page-container">
      <div className="background-images" style={backgroundImageStyle}>
        <div className="page-container3">
          {LevelMap5gif && (
            <img
              src={LevelMap5gif.value}
              alt={LevelMap5gif.key}
              className="clock-images"
            />
          )}

        </div>
      </div>
    </div>
  );
}
