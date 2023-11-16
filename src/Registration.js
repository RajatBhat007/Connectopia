import React, { useEffect, useState } from "react";
import "./App.css";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Register({ apiData }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(true);

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const [data, setData] = useState(apiData);

  useEffect(() => {
    setData(apiData);

    return () => {
      setData(null);
    };
  }, [apiData]);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const isMobileNumberValid = (number) => {
    const mobileNumberPattern = /^[6-9]\d{9}$/;
    return mobileNumberPattern.test(number);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
  };

  function handleFinalScreen() {
    const levelCleared = localStorage.getItem('level-cleared');

    const levelRoutes = {
      '1': '/FinalScreen1',
      '2': '/FinalScreen2',
      '3': '/FinalScreen3',
      '4': '/FinalScreen4',
    };

    const route = levelRoutes[levelCleared] || '/FinalScreen5';

    navigate(route);
  }

  const handleButtonClick = async (event) => {
    event.preventDefault();

    if (name !== "" && phoneNumber !== "") {
      if (!isMobileNumberValid(phoneNumber)) {
        setError("Invalid mobile number.");
      } else {
        setError("");

        try {
          const otpResponse = await axios.post(
            `https://skillmuni.in:8080/sendotp/${phoneNumber}`
          );

          if (otpResponse.status === 200) {
            setIsOtpSent(true);
            setError("");
            setError(otpResponse.data);
          } else {
            setError("Error sending OTP.");
          }
        } catch (error) {
          setError("Error sending OTP.");
        }
      }
    } else {
      setError("Please enter the details.");
    }
  };

  const handleOtpVerification = async () => {
    try {
      const otpVerifyResponse = await axios.get(
        `https://skillmuni.in:8080/verifyotp/${phoneNumber}/${otp}`
      );

      if (otpVerifyResponse.data) {
        setError(otpVerifyResponse.data);

        if (otpVerifyResponse.status === 200) {

          const data = {
            name: name,
            emailid: email,
            phonenumber: phoneNumber,
            campaignid: sessionStorage.getItem("campaignId"),
          };

          try {
            const response = await axios.post(
              "https://skillmuni.in:8080/addPlayerDetails",
              data,
              {
                "Content-Type": "application/json",
              }
            );

            if (isMounted) {
              setName("");
              setPhoneNumber("");
              setEmail("");
              setTimeout(() => {
                handleFinalScreen();
              }, 2000)
              setError("");
              setMsg("You've successfully registered.");
            }
          } catch (error) {
            // setError("Error in API posting.");
            setError("You've already registered.");
            // setError(`Error in API posting`);
            // console.log(`Error in API posting. ${error}`);              
          }
        }
      } else {
        setError("Please enter valid OTP.");
      }
    } catch (error) {
      setError("");
      setError("Please enter valid OTP");
    }
  };

  const backgroundImage = data && data['1'] ? data['1'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Background') : null;
  const Banner = data && data['7'] ? data['7'].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Registration Screen') : null;

  const levelCleared = localStorage.getItem('level-cleared');

  const dataKeys = {
    "0": '8',
    "1": '22',
    "2": '42',
    "3": '62',
    "4": '82',
    "default": '102'
  };

  const dataKey = dataKeys[levelCleared] || dataKeys["default"];

  const ProgressBar = data && data[dataKey]
    ? data[dataKey].find((image) => image.key.replace(/\.(jpeg|jpg|png)$/, '') === 'Progress Bar')
    : null;

  const backgroundImageStyle = {
    backgroundImage: `url("${backgroundImage?.value || ''}")`,
  };


  return (
    <div className="container">
      <div className="page-container">
        <div className="background-image" style={backgroundImageStyle}>
          <div className="register-container1">

            {Banner && (
              <img src={Banner.value} alt="Banner" className="register-image" />
            )}

            <div >
              <div className="overlapping-form">

                <div >
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    required
                    className="hello"
                  />
                </div><br /><br />
                <div >
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    required
                    className="hello"
                  />
                </div><br /><br />
                <div >
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="hello"
                  />
                </div>

              </div>

              {isOtpSent ? (
                <div className="overlapping-form-otp">
                  <div className="otp-container">
                    <input
                      type="text"
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className="input-otp"
                      placeholder="enter OTP"
                    />
                    <button onClick={handleOtpVerification} className="verify-button btn btn-secondary btn-sm" >
                      Verify OTP
                    </button>
                  </div>
                  {otpError && <p className="error-message">{otpError}</p>}
                </div>
              ) : (
                <div className="overlapping-form"></div>
              )}

            </div>
          </div>
          <div className="register-container2">
            {ProgressBar && (
              <img src={ProgressBar.value} alt="ProgressBar" className="progress-image" />
            )}

            <div className="register-text text-center" onClick={handleButtonClick}></div>
            {error && <p className="error-message">{error}</p>}
            {msg && <p className="message">{msg}</p>}
          </div>
        </div>
      </div>

    </div>
  );
}
