import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../styles/createproposal.css";

function CreateProposal() {
  return (
    <>
      <div className="create-proposal-main-div">
        <div className="create-proposal-div">
          <div>
            <h1 className="create-proposal-title">New Proposal</h1>
            <p className="create-proposal-desc">
              Enter the details of a new proposal and submit them.
            </p>
          </div>
          <div>
            <label className="create-proposal-label">Title</label>
            <p>Identify your proposal</p>
            <TextField id="demo-helper-text-misaligned-no-helper" />{" "}
          </div>
          <div>
            <label className="create-proposal-label">Description</label>
            <p>An introduction of about 2-3 lines</p>
            <TextField id="demo-helper-text-misaligned-no-helper" />{" "}
          </div>
          <div className="proposal-margin-div">
            <div>
              <label className="create-proposal-label">
                Upload File/Folder
              </label>
            </div>
            <Button
              variant="contained"
              component="label"
              color="primary"
              className="uploadfile"
            >
              {" "}
              Upload a file
              <input type="file" hidden />
            </Button>
          </div>
          <div className="proposal-margin-div">
            <div>
              <label className="create-proposal-label">Proposal Date</label>
            </div>
            <div className="uploadfile">
              <input type="date" className="proposal-date" />
              <input type="date" className="proposal-date  proposal-date1" />
            </div>
          </div>
          <div className="uploadfile">
            <Button variant="contained" size="large">
              Create Proposal
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProposal;
