import React, { useState } from "react";
import "../styles/tokens.css";
import "../styles/addtoken.css";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";

import LinearProgress from "@mui/material/LinearProgress";
import { TextField } from "@mui/material";

function Tokens() {
  const [age, setAge] = useState("edit");
  const [showAddToken, setAddToken] = useState(false);

  const handleOpen = () => setAddToken(true);
  const handleClose = () => setAddToken(false);

  const handleChange = () => {
    setAge("edit");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <div className="token-main-section">
        <div className="token-main-div">
          <div className="rightbar-token-main">
            <h1 className="token-name">Token</h1>
            <table className="t-table">
              <thead>
                <tr className="table-header">
                  <th>Holder</th>
                  <th id="center">Balance</th>
                  <th id="center">Stake</th>
                  <th className="table-options"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0X2b5603...347sd0f</td>

                  <td id="center">100</td>
                  <td id="center">100 %</td>
                  <td className="table-options">
                    <FormControl
                      sx={{ m: 1, minWidth: 120, fontSize: "0.765rem" }}
                    >
                      <Select
                        value={age}
                        onChange={() => handleChange()}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Add Token</MenuItem>
                        <MenuItem value={20}>Remove Token</MenuItem>
                        <MenuItem value={30}>Add Custom Label</MenuItem>
                      </Select>
                    </FormControl>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="leftbar-token-main">
            <div className="add-token-btn">
              <Button
                variant="contained"
                size="medium"
                className="add-token"
                onClick={handleOpen}
              >
                Add Token
              </Button>
            </div>

            <table className="t-table">
              <thead>
                <tr>
                  <th>Token Info</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Token Supply</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>Transferable</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Token</td>
                  <td>JDP</td>
                </tr>
              </tbody>
            </table>

            <div className="token-leftbar-info">
              <table className="t-table">
                <thead>
                  <tr>
                    <th colSpan={2}>Ownership Distribution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>0X2b5...sd0f (You)</td>
                    <td>100 %</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <Box sx={{ width: "100%" }}>
                        <LinearProgress variant="determinate" value={100} />
                      </Box>
                    </td>
                    {/* <td>Yes</td> */}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Modal
          open={showAddToken}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="add-token-leftbar-token-main">
              <div className="add-token-cancel">
                <h2 className="addtoken-title">Add Token</h2>
                <Button
                  variant="text"
                  onClick={() => {
                    setAddToken(false);
                  }}
                >
                  Cancel
                </Button>
              </div>

              <div className="addtoken-label">
                <div className="addtoken-label1">
                  <label>Recipient Address</label>{" "}
                </div>
                <TextField id="demo-helper-text-misaligned-no-helper" />{" "}
                <div className="addtoken-label1">
                  <label>Add Number Of Tokens</label>
                </div>
                <TextField id="demo-helper-text-misaligned-no-helper" />{" "}
              </div>
              <div className="addtoken-btn">
                <Button variant="contained" size="large" className="addtoken">
                  Add Token
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}
export default Tokens;
