import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MembershipToken from "../../contracts/artifacts/DataDaoToken.json";
import dataDaoInstace from "../../contracts/artifacts/dataDaoInstace.json";
import dataDaoFactory from "../../contracts/artifacts/dataDaoFactory.json";
import { useAccount } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import { ContractFactory } from "ethers";

const dataDaoFactoryContract = "0x8428C82cFf9F7B5b25E2b54C7DF663Fe0002526a";

function ReviewInfo({
  handleNext,
  handleBack,
  dataDaoDetails,
  setDataDaoDetails,
}) {
  const { address } = useAccount();
  const getContract = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }
        const { chainId } = await provider.getNetwork();
        console.log("switch case for this case is: " + chainId);
        if (chainId === 3141) {
          const contract = new ethers.Contract(
            dataDaoFactoryContract,
            dataDaoFactory.abi,
            signer
          );
          return contract;
        } else {
          alert("Please connect to the Filecoin Hyperspace Network!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const votingPeriodEpoch =
    Math.floor(dataDaoDetails.vote_period_day) * 86400 +
    Math.floor(dataDaoDetails.vote_period_hour) * 3600 +
    Math.floor(dataDaoDetails.vote_period_minutes) * 60;
  console.log(votingPeriodEpoch);
  const { ethereum } = window;

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  const luanchDataDao = async () => {
    const contract = await getContract();
    const tokecFactory = new ContractFactory(
      MembershipToken.abi,
      MembershipToken.data.bytecode,
      signer
    );
    const tokenContract = await tokecFactory.deploy(
      dataDaoDetails.token_name,
      dataDaoDetails.token_symbol,
      10000
    );

    const tokenAddress = tokenContract.address;

    console.log(tokenAddress);
    const daoFactory = new ContractFactory(
      dataDaoInstace.abi,
      dataDaoInstace.data.bytecode,
      signer
    );
    const daoContract = await daoFactory.deploy(
      address,
      tokenAddress,
      dataDaoDetails.vote_condition,
      dataDaoDetails.vote_minapproval,
      votingPeriodEpoch,
      0
    );
    const dataDaoAddress = daoContract.address;

    const tx = await contract.createDataDao(
      dataDaoAddress,
      dataDaoDetails.name,
      dataDaoDetails.description,
      tokenAddress,
      0,
      dataDaoDetails.token_holders[0].tokenHolderBalance
    );
    await tx.wait();
    toast.success("Transaction successful!");
    //dataDaoAddress,name, description, token, tokenPrice, totalSupply
    console.log(tx);
  };

  let navigate = useNavigate();
  const routeChange = () => {
    // let path = `newPath`;
    navigate("/");
  };

  console.log(dataDaoDetails);

  return (
    <div className="create-dao-info-main">
      <h1>Review Information</h1>
      <div className="review-main">
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          sx={{ borderRadius: "10px", background: "#e0e0e0" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#ffffff" }} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{
              backgroundColor: "#1976d2",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ width: "100%", flexShrink: 0 }}>
              DataDao Information
            </Typography>
            {/* <Typography sx={{ color: "text.secondary" }}>
              I am an accordion
            </Typography> */}
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "30px" }}>
            <Typography sx={{ textAlign: "left", fontWeight: 700 }}>
              NAME
            </Typography>
            <Typography sx={{ textAlign: "left", margin: "10px 0px" }}>
              {dataDaoDetails.name}
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                fontWeight: 700,
              }}
            >
              DESCRIPTION
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                maxWidth: "100%",
                wordBreak: "break-all",
                margin: "10px 0px",
              }}
            >
              {dataDaoDetails.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          sx={{ borderRadius: "10px", background: "#e0e0e0" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#ffffff" }} />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            sx={{
              backgroundColor: "#1976d2",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ width: "100%", flexShrink: 0 }}>
              Votting Settings
            </Typography>
            {/* <Typography sx={{ color: "text.secondary" }}>
              You are currently not an owner
            </Typography> */}
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "30px" }}>
            <Typography sx={{ textAlign: "left", fontWeight: 700 }}>
              SUPPORT %
            </Typography>
            <Typography sx={{ textAlign: "left", margin: "10px 0px" }}>
              {dataDaoDetails.vote_condition} %
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                fontWeight: 700,
              }}
            >
              MINIMAL APPROVAL %
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                maxWidth: "100%",
                wordBreak: "break-all",
                margin: "10px 0px",
              }}
            >
              {dataDaoDetails.vote_minapproval} %
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                fontWeight: 700,
              }}
            >
              Voting Period
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                maxWidth: "100%",
                wordBreak: "break-all",
                margin: "10px 0px",
              }}
            >
              {dataDaoDetails.vote_period_day +
                " day, " +
                dataDaoDetails.vote_period_hour +
                " hours, " +
                dataDaoDetails.vote_period_minutes +
                " minutes. "}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          sx={{ borderRadius: "10px", background: "#e0e0e0" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#ffffff" }} />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
            sx={{
              backgroundColor: "#1976d2",
              color: "#ffffff",
            }}
          >
            <Typography sx={{ width: "100%", flexShrink: 0 }}>
              Token Configuration
            </Typography>
            {/* <Typography sx={{ color: "text.secondary" }}>
              Filtering has been entirely disabled for whole web server
            </Typography> */}
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "30px" }}>
            <Typography sx={{ textAlign: "left", fontWeight: 700 }}>
              TOKEN NAME & SYMBOL
            </Typography>
            <Typography sx={{ textAlign: "left", margin: "10px 0px" }}>
              {dataDaoDetails.token_name +
                " (" +
                dataDaoDetails.token_symbol +
                ")"}
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                fontWeight: 700,
              }}
            >
              TOKEN HOLDERS
            </Typography>
            <Typography
              sx={{
                textAlign: "left",
                margin: "10px 0px",
              }}
            >
              {dataDaoDetails.token_holders[0].tokenHolders +
                " - " +
                dataDaoDetails.token_holders[0].tokenHolderBalance}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="create-dao-back-next-parent">
        <button className="create-dao-back" onClick={handleBack}>
          Back
        </button>
        <button
          className="create-dao-next"
          onClick={() => {
            luanchDataDao();
          }}
        >
          Launch DataDao
        </button>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        // closeOnClick
        onClick={routeChange}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default ReviewInfo;
