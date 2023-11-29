import { useEffect, useState } from "react";
import { StartGame } from "./StartGame";
import { ViewInstruction } from "./ViewInstruction";
import { Privacypolicy } from "./Privacypolicy";
import { Level1 } from "./Level1";
import { Level2 } from "./Level2";
import { Level3 } from "./Level3";
import { Level4 } from "./Level4";
import { Level5 } from "./Level5";
import { LevelMap2 } from "./LevelMap2";
import { LevelMap3 } from "./LevelMap3";
import { LevelMap4 } from "./LevelMap4";
import { LevelMap5 } from "./LevelMap5";
import QRScanner from "./QRScanner";
import { Winner } from "./Winner";
import { Register } from "./Registration";
import { Timeup0, Timeup2 } from "./TimeUpRegistration";
import { Timeup3 } from "./TimeUpRegistration";
import { Timeup4 } from "./TimeUpRegistration";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";
import { Timer } from "./Timer";
import { Timeup1 } from "./TimeUpRegistration";
import FinalScreen1 from "./FinalScreen1";
import FinalScreen2 from "./FinalScreen2";
import FinalScreen3 from "./FinalScreen3";
import FinalScreen4 from "./FinalScreen4";
import FinalScreen5 from "./FinalScreen5";
import axios from "axios";
import IMGScanner from "./IMGScanner";
import img from "./Game lauched alert new.png";

function App() {
  useEffect(() => {
    const hasRefreshed = localStorage.getItem("hasRefreshed");

    if (hasRefreshed) {
      localStorage.removeItem("hasRefreshed");
      window.location.href = "/Connectopia-Beta";
      localStorage.removeItem("level-cleared");
    } else {
      localStorage.setItem("hasRefreshed", "true");
    }
  }, []);

  return (
    <BrowserRouter basename="/Connectopia-Beta">
      <Routes>
        <Route path="/*" element={<MainContent />} />
        <Route path="/:campaignId/:scanType" element={<MainContent />} />
      </Routes>
    </BrowserRouter>
  );
}

function MainContent() {
  const [pNo, setPNo] = useState(null);
  const location = useLocation();
  const [currentCampaignId, setCurrentCampaignId] = useState(null);
  const [currentScanType, setCurrentScanType] = useState(null);
  const [imageToShow, setImageToShow] = useState(null);
  const [apiError, setApiError] = useState(false);

  const hideTimerOnThesePaths = [
    "/",
    "/view-instruction",
    "/privacy-policy",
    "/begin-1",
    "/winner",
    "/register",
    "/timeup0",
    "/timeup1",
    "/timeup2",
    "/timeup3",
    "/timeup4",
    "/FinalScreen1",
    "/FinalScreen2",
    "/FinalScreen3",
    "/FinalScreen4",
    "/FinalScreen5",
  ].includes(location.pathname);

  let { campaignId, scanType } = useParams();

  const storedCampaignId = sessionStorage.getItem("campaignId");
  const storedScanType = sessionStorage.getItem("scanType");

  if (!campaignId && storedCampaignId) {
    campaignId = storedCampaignId;
  }

  if (!scanType && storedScanType) {
    scanType = storedScanType;
  }

  useEffect(() => {
    if (!campaignId || !scanType) {
      setImageToShow(img);
    } else {
      setCurrentCampaignId(campaignId);
      setCurrentScanType(scanType);
      sessionStorage.setItem("campaignId", campaignId);
      sessionStorage.setItem("scanType", scanType);
    }
  }, [campaignId, scanType]);

  function useApiData(apiUrl) {
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
      if (!apiUrl.includes("undefined")) {
        axios
          .get(apiUrl)
          .then((response) => {
            setApiData(response.data);
            setApiError(false);
          })
          .catch((error) => {
            console.error("Error fetching data from the API:", error);
            setApiError(true);
          });
      } else {
        setApiError(true);
      }
    }, [apiUrl]);

    return apiData;
  }
  debugger;
  const apiUrl = `https://www.connectopia.app:5000/allsignedurls/${campaignId}/${scanType}`;
  const apiData = useApiData(apiUrl);

  if (apiError) {
    return <img src={img} alt="Error loading data" className="fixed-image" />;
  }

  return (
    <div className="App">
      <div className="Timer">
        {!hideTimerOnThesePaths && <Timer pageNo={pNo} apiData={apiData} />}
      </div>
      <Routes>
        <Route path="/" element={<StartGame apiData={apiData} />} />
        <Route
          path="/view-instruction"
          element={<ViewInstruction apiData={apiData} />}
        />
        <Route
          path="/privacy-policy"
          element={<Privacypolicy setPNo={setPNo} apiData={apiData} />}
        />
        {scanType === "QRscan" ? (
          <Route
            path="/scanner"
            element={<QRScanner pageNo={pNo} apiData={apiData} />}
          />
        ) : (
          <Route
            path="/scanner"
            element={<IMGScanner pageNo={pNo} apiData={apiData} />}
          />
        )}
        <Route
          path="/begin-1"
          element={<Level1 setPNo={setPNo} apiData={apiData} />}
        />
        <Route
          path="/begin-2"
          element={<Level2 setPNo={setPNo} apiData={apiData} />}
        />
        <Route
          path="/begin-3"
          element={<Level3 setPNo={setPNo} apiData={apiData} />}
        />
        <Route
          path="/begin-4"
          element={<Level4 setPNo={setPNo} apiData={apiData} />}
        />
        <Route
          path="/begin-5"
          element={<Level5 setPNo={setPNo} apiData={apiData} />}
        />
        <Route path="/winner" element={<Winner apiData={apiData} />} />
        <Route path="/levelmap2" element={<LevelMap2 apiData={apiData} />} />
        <Route path="/timeup0" element={<Timeup0 apiData={apiData} />} />
        <Route path="/timeup1" element={<Timeup1 apiData={apiData} />} />
        <Route path="/timeup2" element={<Timeup2 apiData={apiData} />} />
        <Route path="/timeup3" element={<Timeup3 apiData={apiData} />} />
        <Route path="/timeup4" element={<Timeup4 apiData={apiData} />} />
        <Route path="/levelmap3" element={<LevelMap3 apiData={apiData} />} />
        <Route path="/levelmap4" element={<LevelMap4 apiData={apiData} />} />
        <Route path="/levelmap5" element={<LevelMap5 apiData={apiData} />} />
        <Route path="/register" element={<Register apiData={apiData} />} />

        <Route
          path="/FinalScreen1"
          element={<FinalScreen1 apiData={apiData} />}
        />
        <Route
          path="/FinalScreen2"
          element={<FinalScreen2 apiData={apiData} />}
        />
        <Route
          path="/FinalScreen3"
          element={<FinalScreen3 apiData={apiData} />}
        />
        <Route
          path="/FinalScreen4"
          element={<FinalScreen4 apiData={apiData} />}
        />
        <Route
          path="/FinalScreen5"
          element={<FinalScreen5 apiData={apiData} />}
        />

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
