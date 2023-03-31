import React, { useEffect, useState } from "react";
import StepsForm from "./StepsForm";
import "../../styles/CreateDao.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DatadaoInfo from "./DatadaoInfo";
import VotingSetting from "./VotingSetting";
import TokenConfiguration from "./TokenConfiguration";
import ReviewInfo from "./ReviewInfo";

function CreateDao() {
  const [showDataDaoInfo, setDataDaoInfo] = useState(true);
  const [showVoteSettings, setVoteSettings] = useState(false);
  const [showTokenConfiguration, setTokenConfiguration] = useState(false);
  const [showReviewInfo, setReviewInfo] = useState(false);

  const [progressbar, setProgressbar] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const [dataDaoDetails, setDataDaoDetails] = useState({
    name: "",
    description: "",
    vote_condition: "",
    vote_minapproval: "",
    vote_period: "",
    token_name: "",
    token_symbol: "",
    token_holders: [],
  });

  const handleNext = () => {
    console.log(dataDaoDetails);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  useEffect(() => {
    if (activeStep === 0) {
      setProgressbar(0);
      setDataDaoInfo(true);
      setVoteSettings(false);
      setTokenConfiguration(false);
      setReviewInfo(false);
    } else if (activeStep === 1) {
      setProgressbar(30);
      setVoteSettings(true);
      setDataDaoInfo(false);
      setTokenConfiguration(false);
      setReviewInfo(false);
    } else if (activeStep === 2) {
      setProgressbar(60);
      setVoteSettings(false);
      setDataDaoInfo(false);
      setTokenConfiguration(true);
      setReviewInfo(false);
    } else if (activeStep === 3) {
      setProgressbar(100);
      setVoteSettings(false);
      setDataDaoInfo(false);
      setTokenConfiguration(false);
      setReviewInfo(true);
    } else if (activeStep === 4) {
      // setProgressbar(100);
    }
  }, [activeStep]);
  return (
    <div className="create-dao-main">
      <div className="left-div">
        <div>
          {/* <div style={{ width: 150, height: 150, marginBottom: "30px" }}>
            <CircularProgressbar
              value={progressbar}
              max={100}
              text={`${progressbar}%`}
            />
          </div> */}
        </div>
        <div className="stp-form">
          <StepsForm
            activeStep={activeStep}
            handleNext={handleNext}
            handleBack={handleBack}
            handleReset={handleReset}
          />
        </div>
      </div>
      <div className="right-div">
        {showDataDaoInfo ? (
          <DatadaoInfo
            handleNext={handleNext}
            handleBack={handleBack}
            dataDaoDetails={dataDaoDetails}
            setDataDaoDetails={setDataDaoDetails}
          />
        ) : showVoteSettings ? (
          <VotingSetting
            handleNext={handleNext}
            handleBack={handleBack}
            dataDaoDetails={dataDaoDetails}
            setDataDaoDetails={setDataDaoDetails}
          />
        ) : showTokenConfiguration ? (
          <TokenConfiguration
            handleNext={handleNext}
            handleBack={handleBack}
            dataDaoDetails={dataDaoDetails}
            setDataDaoDetails={setDataDaoDetails}
          />
        ) : showReviewInfo ? (
          <ReviewInfo
            handleNext={handleNext}
            handleBack={handleBack}
            dataDaoDetails={dataDaoDetails}
            setDataDaoDetails={setDataDaoDetails}
          />
        ) : null}
      </div>
    </div>
  );
}

export default CreateDao;
