import React, { useState } from "react";

function DatadaoInfo({
  handleNext,
  handleBack,
  dataDaoDetails,
  setDataDaoDetails,
}) {
  return (
    <div className="create-dao-info-main">
      <h1>Enter the DataDao Information</h1>
      <div className="create-dao-info-input-parent">
        <div className="create-dao-info-input-child">
          <input
            type="text"
            placeholder="Enter name of the DataDao"
            onChange={(e) =>
              setDataDaoDetails({ ...dataDaoDetails, name: e.target.value })
            }
          />
          
        </div>
        <div className="create-dao-info-input-child">
          <textarea
            type="text"
            placeholder="Enter Datadao description"
            rows="10"
            cols="50"
            onChange={(e) =>
              setDataDaoDetails({
                ...dataDaoDetails,
                description: e.target.value,
              })
            }
          />
          
        </div>
      </div>
      <div className="create-dao-back-next-parent">
        <button className="create-dao-back" disabled onClick={handleBack}>
          Back
        </button>
        <button className="create-dao-next" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default DatadaoInfo;
