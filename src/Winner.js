import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Level2.css";

export function Winner({ apiData }) {

  const [data, setData] = useState(apiData);

  useEffect(() => {
    setData(apiData);

    return () => {
      setData(null);
    };
  }, [apiData]);

  let navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/register");
  };

  const backgroundImage = data && data['1'] ? data['1'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Background') : null;
  const banner = data && data['105'] ? data['105'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Level Completion Badge') : null;
  const ProgressBar = data && data['102'] ? data['102'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Progress Bar') : null;


  const backgroundImageStyle = {
    backgroundImage: `url("${backgroundImage?.value || ''}")`,
  };

  return (
    <div className="page-container">
      <div className="background-image" style={backgroundImageStyle}>
        <div className="page-container1">
          {banner && (
            <img
              src={banner.value}
              alt={banner.key}
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

          <div className="time-text  text-center"></div>
        </div>
      </div>
    </div>
  );
}
