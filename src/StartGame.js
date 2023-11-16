import React, { useEffect, useState } from "react";
import './StartGame.css';
import { useNavigate } from "react-router-dom";

export function StartGame({ apiData }) {

  let navigate = useNavigate();

  const [data, setData] = useState(apiData);

  useEffect(() => {
    setData(apiData);

    return () => {
      setData(null);
    };
  }, [apiData]);

  function handleButtonClick() {
    navigate('/begin-1')
    localStorage.removeItem("timerValue");
  }

  function handleHowToBeginButtonClick() {
    navigate('/view-instruction')
    localStorage.removeItem("timerValue");
  }

  const backgroundImage = data && data['1'] ? data['1'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Background') : null;
  const welcomeImage = data && data['2'] ? data['2'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Welcome Screen') : null;

  const backgroundImageStyle = {
    backgroundImage: `url("${backgroundImage?.value || ''}")`,
  };

  return (
    <div className="page-container">
      <div className="background-image" style={backgroundImageStyle}>
        <div className="page-container3">
          {welcomeImage && (
            <img src={welcomeImage.value} alt="Banner" className="begin-images" />
          )}
          <div className="how-begin text-center" onClick={handleHowToBeginButtonClick}>
          </div>
          <div className="button-begin text-center" onClick={handleButtonClick}>
          </div>
        </div>
      </div>
    </div>
  );
}
