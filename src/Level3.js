import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Level2.css';

export function Level3({ setPNo, apiData }) {

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
    setPNo('3')
  };

  const backgroundImage = data && data['1'] ? data['1'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Background') : null;
  const Banner = data && data['45'] ? data['45'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Level Completion Badge') : null;
  const ProgressBar = data && data['62'] ? data['62'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Progress Bar') : null;


  const backgroundImageStyle = {
    backgroundImage: `url("${backgroundImage?.value || ''}")`,
  };

  return (
    <div className="page-container">
      <div className="background-image" style={backgroundImageStyle}>
        <div className="page-container1">

          {Banner && (
            <img
              src={Banner.value}
              alt={Banner.key}
              className="clock-image"
            />
          )}

          <div className="time-text  text-center" onClick={handleButtonClick}>
          </div>

        </div>
        <div className="page-container2">

          {ProgressBar && (
            <img
              src={ProgressBar.value}
              alt={ProgressBar.key}
              className="progress-image"
            />
          )}

          <div className="time-text  text-center" >

          </div>

        </div>
      </div>
    </div>
  );
}