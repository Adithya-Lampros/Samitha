import React, { useState } from "react";
import "../styles/availabelproposal.css";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Modal, TextField } from "@mui/material";
import "../styles/createproposal.css";

function SamithaProposal() {
  const [age, setAge] = useState("");
  const [showCreateProposal, setCreateProposal] = useState(false);

  const handleOpen2 = () => setCreateProposal(true);
  const handleClose2 = () => setCreateProposal(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",

    p: 4,
  };

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className="availabel-proposal-main-div">
        <div className="availabel-proposal">
          <div className="availabel-proposal-section1">
            <div className="A-proposal-title">Proposals</div>
            <div>
              <Button variant="contained" size="large" onClick={handleOpen2}>
                Create proposal
              </Button>
            </div>
          </div>
          <div className="availabel-proposal-section2">
            <div>
              <FormControl sx={{ m: 1, minWidth: 70 }} size="small">
                <InputLabel id="demo-select-small">...</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={age}
                  label="..."
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>...</em>
                  </MenuItem>
                  <MenuItem value={10}>All</MenuItem>
                  <MenuItem value={20}>Open</MenuItem>
                  <MenuItem value={30}>Closed</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl sx={{ m: 1, minWidth: 70 }} size="small">
                <InputLabel id="demo-select-small">...</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={age}
                  label="..."
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>...</em>
                  </MenuItem>
                  <MenuItem value={10}>All</MenuItem>
                  <MenuItem value={20}>Passed</MenuItem>
                  <MenuItem value={30}>Rejected</MenuItem>
                  <MenuItem value={30}>Pending</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl sx={{ m: 1, minWidth: 70 }} size="small">
                <InputLabel id="demo-select-small">...</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={age}
                  label="..."
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>...</em>
                  </MenuItem>
                  <MenuItem value={10}>All</MenuItem>
                  <MenuItem value={20}>Voting</MenuItem>
                  <MenuItem value={30}>Tokens</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <input type="date" className="proposal-date" />
            </div>
            <div>
              <input type="date" className="proposal-date" />
            </div>
          </div>
          <div className="availabel-proposal-section3">
            <div className="A-proposal-title">Active Proposals</div>
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  {" "}
                  <div className="proposal-details">
                    <h3 className="proposal-grid-title">Proposal</h3>
                    <h3 className="proposal-grid-title">Proposal Name</h3>
                    <p>
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <div className="proposal-margin-div">
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
                    <div className="uploadfile">
                      <input type="date" className="proposal-date" />
                      <input
                        type="date"
                        className="proposal-date  proposal-date1"
                      />
                    </div>
                    <div className="uploadfile">
                      <Button
                        variant="contained"
                        size="large"
                        id="uploadfile-btn"
                      >
                        Vote
                      </Button>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="proposal-details">
                    <h2 className="proposal-grid-title">Proposal</h2>
                    <h3>Proposal Name</h3>
                    <p>
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <div className="proposal-margin-div">
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
                    <div className="uploadfile">
                      <input type="date" className="proposal-date" />
                      <input
                        type="date"
                        className="proposal-date  proposal-date1"
                      />
                    </div>
                    <div className="uploadfile">
                      <Button
                        variant="contained"
                        size="large"
                        id="uploadfile-btn"
                      >
                        Vote
                      </Button>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
        <Modal
          open={showCreateProposal}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
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
                    <label className="create-proposal-label">
                      Proposal Date
                    </label>
                  </div>
                  <div className="uploadfile">
                    <input type="date" className="proposal-date" />
                    <input
                      type="date"
                      className="proposal-date  proposal-date1"
                    />
                  </div>
                </div>
                <div className="uploadfile">
                  <Button variant="contained" size="large">
                    Create Proposal
                  </Button>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default SamithaProposal;
