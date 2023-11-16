import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import "./QRScanner.css";
import { useNavigate } from "react-router-dom";

function QRScanner(props) {
  const [result, setResult] = useState("");
  const [currentImage, setCurrentImage] = useState(null);
  const [data1, setData1] = useState(props.apiData);
  const [currentTextImage, setCurrentTextImage] = useState(null);

  const navigate = useNavigate();
  const videoRef = useRef(null);
  const scannerBarRef = useRef(null);

  useEffect(() => {
    if (props.pageNo === "1") {
      localStorage.setItem('level-cleared', 0);
    }
    setData1(props.apiData);

    return () => {
      setData1(null);
    };
  }, [props.apiData]);

  const girlImage = data1 && data1['24'] ? data1['24'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Level Completion Thought') : null;
  const boyImage = data1 && data1['44'] ? data1['44'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Level Completion Thought') : null;

  const textPromtAfterSuccessfulScan1 = data1 && data1['23'] ? data1['23'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Text Promt After Successful Scan') : null;
  const textPromtAfterSuccessfulScan2 = data1 && data1['43'] ? data1['43'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Text Promt After Successful Scan') : null;
  const textPromtAfterSuccessfulScan3 = data1 && data1['63'] ? data1['63'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Text Promt After Successful Scan') : null;
  const textPromtAfterSuccessfulScan4 = data1 && data1['83'] ? data1['83'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Text Promt After Successful Scan') : null;
  const textPromtAfterSuccessfulScan5 = data1 && data1['103'] ? data1['103'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Text Promt After Successful Scan') : null;

  const imageMap = {
    1: girlImage?.value || null,
    2: boyImage?.value || null,
    3: girlImage?.value || null,
    4: boyImage?.value || null,
    5: girlImage?.value || null,
  };

  const [textImageMap, setTextImageMap] = useState({
    1: textPromtAfterSuccessfulScan1?.value || null,
    2: textPromtAfterSuccessfulScan2?.value || null,
    3: textPromtAfterSuccessfulScan3?.value || null,
    4: textPromtAfterSuccessfulScan4?.value || null,
    5: textPromtAfterSuccessfulScan5?.value || null,
  });


  const handleScan = () => {
    if (videoRef.current && videoRef.current.videoWidth > 0) {
      const videoElement = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      let imageValues = [];
      if (data1 && data1['0']) {
        data1['0'].forEach((item) => {
          const key = item.key;
          const valueWithoutExtension = key.split('.')[0];
          imageValues.push(valueWithoutExtension);
        });
      }

      imageValues = imageValues.filter(value => value !== 'Main-QRCode');

      imageValues.sort((a, b) => {
        const numA = parseInt(a.split(' ')[1]);
        const numB = parseInt(b.split(' ')[1]);
        return numA - numB;
      });

      if (code) {
        setResult(code.data);
        const data = code.data;

        switch (true) {
          case data === "QR 1" && props.pageNo === "1":
            setCurrentTextImage(textImageMap["1"]);
            setTimeout(() => {
              setCurrentImage(imageMap["1"]);
              setTimeout(() => {
                setTimeout(() => {
                  navigate("/levelmap2");
                  localStorage.setItem('level-cleared', '1')
                  setTimeout(() => {
                    setCurrentImage(null);
                    navigate("/begin-2");
                  }, 4000);
                }, 0);
              }, 3000)
            }, 4000);
            break;

          case data === imageValues[1] && props.pageNo === "2":
            setCurrentTextImage(textImageMap["2"]);
            setTimeout(() => {
              setCurrentImage(imageMap["2"]);
              setTimeout(() => {
                setTimeout(() => {
                  navigate("/levelmap3");
                  localStorage.setItem('level-cleared', '2')
                  setTimeout(() => {
                    setCurrentImage(null);
                    navigate("/begin-3");
                  }, 4000);
                }, 0);
              }, 3000);
            }, 4000);
            break;

          case data === imageValues[2] && props.pageNo === "3":
            setCurrentTextImage(textImageMap["3"]);
            setTimeout(() => {
              setCurrentImage(imageMap["3"]);
              setTimeout(() => {
                setTimeout(() => {
                  navigate("/levelmap4");
                  localStorage.setItem('level-cleared', '3')
                  setTimeout(() => {
                    setCurrentImage(null);
                    navigate("/begin-4");
                  }, 4000);
                }, 0);
              }, 3000);
            }, 4000);
            break;

          case data === imageValues[3] && props.pageNo === "4":
            setCurrentTextImage(textImageMap["4"]);
            setTimeout(() => {
              setCurrentImage(imageMap["4"]);
              setTimeout(() => {
                setTimeout(() => {
                  navigate("/levelmap5");
                  localStorage.setItem('level-cleared', '4')
                  setTimeout(() => {
                    setCurrentImage(null);
                    navigate("/begin-5");
                  }, 4000);
                }, 0);
              }, 3000);
            }, 4000);
            break;

          case data === imageValues[4] && props.pageNo === "5":
            setCurrentTextImage(textImageMap["5"]);
            setTimeout(() => {
              setCurrentImage(imageMap["5"]);
              setTimeout(() => {
                navigate("/winner");
                localStorage.setItem('level-cleared', '5')
              }, 3000);
            }, 4000);
            break;

          default:
            break;
        }
      }
    }

    const handleError = (err) => {
      console.error(err);
    };
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    const scannerBarElement = scannerBarRef.current;
    let scannerBarPosition = 0;
    const scannerBarSpeed = 40;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          videoElement.srcObject = stream;
          videoElement.play();
        })
        .catch((error) => {
          console.error("Error accessing the camera:", error);
        });
    }
    const intervalId = setInterval(() => {
      handleScan();
      scannerBarPosition += scannerBarSpeed;
      if (scannerBarPosition > videoElement.videoHeight) {
        scannerBarPosition = 0;
      }
      if (scannerBarElement) {
        scannerBarElement.style.transform = `translateY(${scannerBarPosition}px)`;
      }
    }, 100);
    return () => {
      if (videoElement.srcObject) {
        videoElement.srcObject.getTracks().forEach((track) => track.stop());
      }
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="scanner-container">
      <div className="video-container">
        <div className="square">
          <div className="horizontal-line top-left"></div>
          <div className="horizontal-line bottom-left"></div>
          <div className="horizontal-line top-right"></div>
          <div className="horizontal-line bottom-right"></div>
          <div className="vertical-line top-left"></div>
          <div className="vertical-line bottom-left"></div>
          <div className="vertical-line top-right"></div>
          <div className="vertical-line bottom-right"></div>
        </div>
        <div className="video-mask">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="video-preview"
          />
        </div>
      </div>
      <div className="camera-mask" />
      <div className="scanner-bar" ref={scannerBarRef} />

      {!currentImage ? <div className="charater-container4">
        {currentTextImage && (
          <img src={currentTextImage} alt="Verification Successful" />
        )}
      </div> : null}

      <div className="charater-container3">
        {currentImage && (
          <img src={currentImage} alt="Verification Successful" />
        )}
      </div>
      {/* <p>{result}</p> */}
    </div>
  );
}
export default QRScanner;

