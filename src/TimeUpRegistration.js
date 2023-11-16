
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Level1.css";
import "./TimeUpRegistration.css"


export function Timeup0({ apiData }) {

  const [data, setData] = useState(apiData);

  useEffect(() => {
    setData(apiData);

    return () => {
      setData(null);
    };
  }, [apiData]);

  const backgroundImage = data && data['1'] ? data['1'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Background') : null;
  const banner = data && data['26'] ? data['26'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Time Up Registration') : null;


  const backgroundImageStyle = {
    backgroundImage: `url("${backgroundImage?.value || ''}")`,
  };

  return (
    <div className="page-container">
      <div className="background-image" style={backgroundImageStyle}>
        <div className="timeup-container">
          {banner && (
            <img
              src={banner.value}
              alt={banner.key}
              className="timeup-images"
            />
          )}
        </div>

      </div>
    </div>
  );
}


export function Timeup1({ apiData }) {

  let navigate = useNavigate();

  const [data, setData] = useState(apiData);

  useEffect(() => {
    setData(apiData);

    return () => {
      setData(null);
    };
  }, [apiData]);

  const handleButtonClick = () => {
    navigate("/register");
  };

  const backgroundImage = data && data['1'] ? data['1'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Background') : null;
  const banner = data && data['46'] ? data['46'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Time Up Registration') : null;


  const backgroundImageStyle = {
    backgroundImage: `url("${backgroundImage?.value || ''}")`,
  };

  return (
    <div className="page-container">
      <div className="background-image" style={backgroundImageStyle}>
        <div className="timeup-container">
          {banner && (
            <img
              src={banner.value}
              alt={banner.key}
              className="timeup-images"
            />
          )}

          <div className="timeup-begin text-center" onClick={handleButtonClick}>

          </div>
        </div>

      </div>
    </div>
  );
}

export function Timeup2({ apiData }) {
  let navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/register");
  };

  const [data, setData] = useState(apiData);

  useEffect(() => {
    setData(apiData);

    return () => {
      setData(null);
    };
  }, [apiData]);

  const backgroundImage = data && data['1'] ? data['1'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Background') : null;
  const banner = data && data['66'] ? data['66'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Time Up Registration') : null;


  const backgroundImageStyle = {
    backgroundImage: `url("${backgroundImage?.value || ''}")`,
  };

  return (
    <div className="page-container">
      <div className="background-image" style={backgroundImageStyle}>
        <div className="timeup-container">
          {banner && (
            <img
              src={banner.value}
              alt={banner.key}
              className="timeup-images"
            />
          )}

          <div className="timeup-begin text-center" onClick={handleButtonClick}>

          </div>
        </div>

      </div>
    </div>
  );
}
export function Timeup3({ apiData }) {
  let navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/register");
  };

  const [data, setData] = useState(apiData);

  useEffect(() => {
    setData(apiData);

    return () => {
      setData(null);
    };
  }, [apiData]);

  const backgroundImage = data && data['1'] ? data['1'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Background') : null;
  const banner = data && data['86'] ? data['86'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Time Up Registration') : null;

  const backgroundImageStyle = {
    backgroundImage: `url("${backgroundImage?.value || ''}")`,
  };

  return (
    <div className="page-container">
      <div className="background-image" style={backgroundImageStyle}>
        <div className="timeup-container">
          {banner && (
            <img
              src={banner.value}
              alt={banner.key}
              className="timeup-images"
            />
          )}

          <div className="timeup-begin text-center" onClick={handleButtonClick}>

          </div>
        </div>

      </div>
    </div>
  );
}
export function Timeup4({ apiData }) {
  let navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/register");
  };

  const [data, setData] = useState(apiData);

  useEffect(() => {
    setData(apiData);

    return () => {
      setData(null);
    };
  }, [apiData]);

  const backgroundImage = data && data['1'] ? data['1'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Background') : null;
  const banner = data && data['106'] ? data['106'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Time Up Registration') : null;

  const backgroundImageStyle = {
    backgroundImage: `url("${backgroundImage?.value || ''}")`,
  };

  return (
    <div className="page-container">
      <div className="background-image" style={backgroundImageStyle}>
        <div className="timeup-container">
          {banner && (
            <img
              src={banner.value}
              alt={banner.key}
              className="timeup-images"
            />
          )}

          <div className="timeup-begin text-center" onClick={handleButtonClick}>

          </div>
        </div>

      </div>
    </div>
  );
}