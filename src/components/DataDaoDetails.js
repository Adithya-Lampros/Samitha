import React from "react";
import "../styles/daodetails.css";
import Button from "@mui/material/Button";

function DataDaoDetails({ setDatadaos, setSingleDataDao }) {
  return (
    <>
      <div className="datadao-details-main-div">
        <div className="datadao-details-div">
          <div className="datadao-details-section1">
            <h1 className="datadao-details-title">Name</h1>
            <p className="datadao-details-desc">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="dao-details-flext">
              <h3 className="dao-details-token-name">Token Name</h3>
              <h3 className="dao-details-token-no">No of Tokens</h3>
            </div>
            <div className="datadao-details-button">
              <Button variant="contained" size="large">
                Buy Token
              </Button>
            </div>
          </div>
          <div className="section-devider"></div>
          <div className="datadao-details-section2">
            <h1 className="datadao-details-dataset">Available Dataset</h1>
            <div className="dataset-main-flex">
              <div className="datadao-rightbar-flex">
                <h3>Name of Proposal</h3>
                <p>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <h4>uploaded file</h4>
                <h4>23/10/2022</h4>
              </div>
              <div className="datadao-leftbar-flex">
                <div className="datadao-details-button">
                  <Button
                    variant="contained"
                    size="large"
                    className="datadao-details-btn"
                  >
                    Update
                  </Button>
                </div>
                <div className="datadao-details-button">
                  <Button
                    variant="contained"
                    size="large"
                    className="datadao-details-btn"
                  >
                    Put on Sell
                  </Button>
                </div>
                <div className="datadao-details-button">
                  <Button
                    variant="contained"
                    size="large"
                    className="datadao-details-btn"
                  >
                    Request Dataset
                  </Button>
                </div>
                <Button
                  className="datadao-details-btn-cls"
                  onClick={() => {
                    setDatadaos(true);
                    setSingleDataDao(false);
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DataDaoDetails;
