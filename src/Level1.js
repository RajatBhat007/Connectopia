import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Level1.css";

export function Level1({ setPNo, apiData }) {

  let navigate = useNavigate();

  const [data, setData] = useState(apiData);

  useEffect(() => {
    setData(apiData);

    return () => {
      setData(null);
    };
  }, [apiData]);

  const handleButtonClick = () => {
    navigate("/scanner");
    setPNo("1");
  };

  const backgroundImage = data && data['6'] ? data['6'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'sky Background') : null;
  const LevelMap1 = data?.['21']?.find((image) => image.key === 'Level Map.gif');

  const backgroundImageStyle = {
    backgroundImage: `url("${backgroundImage?.value || ''}")`,
  };

  return (
    <div className="page-container">
      <div className="background-images" style={backgroundImageStyle}>
        <div className="page-container3">

          {LevelMap1 && (
            <img
              src={LevelMap1.value}
              alt={LevelMap1.key}
              className="begin-images"
            />
          )}

          <div className="button-begin text-center" onClick={handleButtonClick}>
          </div>
        </div>
      </div>
    </div>
  );
}

