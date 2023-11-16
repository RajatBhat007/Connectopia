import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './ViewInstruction.css';

export function ViewInstruction({ apiData }) {
  let navigate = useNavigate();

  const [data, setData] = useState(apiData);

  useEffect(() => {
    setData(apiData);

    return () => {
      setData(null);
    };
  }, [apiData]);

  const handleButtonClick = () => {
    navigate("/begin-1");
  };

  function handlePrivacyPolicyButtonClick() {
    navigate('/privacy-policy')
    localStorage.removeItem("timerValue");
  }

  const handleCloseIcon = () => {
    navigate('/');
  }

  const backgroundImage = data && data['1'] ? data['1'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Background') : null;
  const InstructionsImage = data && data['3'] ? data['3'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Instructions Screen') : null;


  const backgroundImageStyle = {
    backgroundImage: `url("${backgroundImage?.value || ''}")`,
  };

  return (
    <div className="page-container">
      <div className="background-image" style={backgroundImageStyle}>
        <div className="page-container3">
          {InstructionsImage && (
            <img
              src={InstructionsImage.value}
              alt={InstructionsImage.key}
              className="begin-images"
            />
          )}
          <div className="how-begin text-center" onClick={handlePrivacyPolicyButtonClick}></div>
          <div className="close-icon text-center" onClick={handleCloseIcon}></div>
          <div className="button-begin text-center" onClick={handleButtonClick}></div>
        </div>
      </div>
    </div>
  );
}