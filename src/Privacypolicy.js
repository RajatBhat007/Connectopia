import React, { useEffect, useState } from "react";
import './Privacypolicy.css';
import { useNavigate } from "react-router-dom";
import { Timer } from "./Timer";

export function Privacypolicy({ setPNo, apiData }) {
  let navigate = useNavigate();
  const [timerActive, setTimerActive] = useState(false);

  const [data, setData] = useState(apiData);

  useEffect(() => {
    setData(apiData);

    return () => {
      setData(null);
    };
  }, [apiData]);

  const handleButtonClick = () => {
    navigate("/begin-1");
    setTimerActive(true);
  };

  const handleCloseIcon = () => {
    navigate('/');
  }

  const backgroundImage = data && data['1'] ? data['1'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Background') : null;
  const privacyPolicyImage = data && data['4'] ? data['4'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Privacy Policy Screen') : null;

  const backgroundImageStyle = {
    backgroundImage: `url("${backgroundImage?.value || ''}")`,
  };

  return (
    <div className="page-container">
      <div className="background-image" style={backgroundImageStyle}>
        <div className="page-container3">
          {privacyPolicyImage && (
            <img
              src={privacyPolicyImage.value}
              alt={privacyPolicyImage.key}
              className="begin-images"
            />
          )}
          <div className="close-icon text-center" onClick={handleCloseIcon}></div>
          <div className="button-begin text-center" onClick={handleButtonClick}></div>
        </div>
      </div>
    </div>
  );
}
