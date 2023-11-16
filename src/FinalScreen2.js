import React, { useEffect, useState } from "react";

function FinalScreen2({ apiData }) {

  const [data, setData] = useState(apiData);

  useEffect(() => {
    setData(apiData);

    return () => {
      setData(null);
    };
  }, [apiData]);

  const backgroundImage = data && data['1'] ? data['1'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Background') : null;
  const banner = data && data['47'] ? data['47'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Reward Claim Badge') : null;

  const backgroundImageStyle = {
    backgroundImage: `url("${backgroundImage?.value || ''}")`,
  };

  return (
    <div className="page-container">
      <div className="background-image" style={backgroundImageStyle}>
        <div className="page-container3">
          {banner && (
            <img
              src={banner.value}
              alt={banner.key}
              className="clock-images"
            />
          )}

        </div>
      </div>
    </div>
  );
}

export default FinalScreen2;