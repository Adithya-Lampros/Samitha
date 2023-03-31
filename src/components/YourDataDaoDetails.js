import React, { useState, useEffect, useRef } from "react";
import "../styles/daodetails.css";
import Button from "@mui/material/Button";
import dataDaoFactory from "../contracts/artifacts/dataDaoFactory.json";
import { ContractFactory, ethers } from "ethers";
import { Box, Modal } from "@mui/material";
import uploadfile from "../assets/upload.png";
import dataDaoInstace from "../contracts/artifacts/dataDaoInstace.json";
import lighthouse from "@lighthouse-web3/sdk";
import { useNavigate } from "react-router-dom";

const dataDaoFactoryContract = "0x8428C82cFf9F7B5b25E2b54C7DF663Fe0002526a";

function YourDataDaoDetails({
  datadaos,
  setDatadaos,
  setSingleYourDataDao,
  setYourDaos,
  yourDaos,
  daoAddress,
}) {
  const inputRef = useRef();
  const inputRefEnd = useRef();
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const [showCreateProposal, setCreateProposal] = useState(false);
  const handleOpen2 = () => setCreateProposal(true);
  const handleClose2 = () => setCreateProposal(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,

    boxShadow: 24,
    p: 4,
  };

  const [dataDaoInfo, setDataDaoInfo] = useState([]);
  const [proposalInfo, setProposalInfo] = useState({
    Name: null,
    Description: null,
    startDate: null,
    endDate: null,
  });
  const [fileInfo, setFileInfo] = useState(null);
  const { ethereum } = window;

  const getContract = async () => {
    try {
      console.log("in");
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
          console.log(contract);
          return contract;
        } else {
          alert("Please connect to the Mumbai Testnet Network!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDataDaos = async () => {
    const contract = await getContract();
    const dataDao = await contract.allDataDaos(daoAddress);
    setDataDaoInfo(dataDao);
    console.log(dataDao);
  };

  /// lighthouse encrypted upload *************************************************************

  const encryptionSignature = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return {
      signedMessage: signedMessage,
      publicKey: address,
    };
  };
  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const encryptionSignature_ = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return {
      signedMessage: signedMessage,
      publicKey: address,
    };
  };

  /* Deploy file along with encryption */
  const deployEncrypted = async (e) => {
    /*
         uploadEncrypted(e, publicKey, accessToken, uploadProgressCallback)
         - e: js event
         - publicKey: wallets public key
         - accessToken: your api key
         - signedMessage: message signed by the owner of publicKey
         - uploadProgressCallback: function to get progress (optional)
      */
    const sig = await encryptionSignature();
    const response = await lighthouse.uploadEncrypted(
      e,
      sig.publicKey,
      "710d524c-69dd-4666-93dc-54d7107d1172",
      sig.signedMessage,
      progressCallback
    );

    setFileInfo(response);
    console.log(response);
    /*
        output:
          {
            Name: "c04b017b6b9d1c189e15e6559aeb3ca8.png",
            Size: "318557",
            Hash: "QmcuuAtmYqbPYmPx3vhJvPDi61zMxYvJbfENMjBQjq7aM3"
          }
        Note: Hash in response is CID.
      */

    // Conditions to add
    const conditions = [
      {
        id: 1,
        chain: "Hyperspace",
        method: "balanceOf",
        standardContractType: "ERC20",
        contractAddress: dataDaoInfo.dataDAOTokenAddress,
        returnValueTest: { comparator: ">=", value: "1" },
        parameters: [sig.publicKey],
      },
    ];

    // Aggregator is what kind of operation to apply to access conditions
    // Suppose there are two conditions then you can apply ([1] and [2]), ([1] or [2]), !([1] and [2]).
    const aggregator = "([1])";
    const { publicKey, signedMessage } = await encryptionSignature_();

    /*
      accessCondition(publicKey, cid, signedMessage, conditions, aggregator)
        Parameters:
          publicKey: owners public key
          CID: CID of file to decrypt
          signedMessage: message signed by owner of publicKey
          conditions: should be in format like above
          aggregator: aggregator to apply on conditions
    */
    const response_ = await lighthouse.accessCondition(
      publicKey,
      response.data.Hash,
      signedMessage,
      conditions,
      aggregator
    );

    console.log(response_);
  };

  const createProposal = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      daoAddress,
      dataDaoInstace.abi,
      signer
    );
    const date1 = new Date(proposalInfo.startDate);
    const date2 = new Date(proposalInfo.endDate);
    const diffTime = Math.abs(date2 - date1);
    console.log(diffTime);

    // console.log(String2Hex(fileInfo.data.Hash));
    contract.createDataSetDealProposal(
      fileInfo.data.Hash,
      fileInfo.data.Size,
      diffTime / 1000,
      0,
      proposalInfo.Name,
      proposalInfo.Description,
      {
        gasLimit: 10000000,
      }
    );
  };

  useEffect(() => {
    getDataDaos();
    return setDataDaoInfo([]);
  }, []);

  return (
    <>
      <div className="datadao-details-main-div">
        <div className="datadao-details-div">
          <div className="datadao-details-section1">
            <div className="button-flex">
              <h1 className="datadao-details-title padding-div">
                {dataDaoInfo.dataDaoName}
              </h1>
              <button
                className="datadao-details-btn-close"
                onClick={() => {
                  setYourDaos(true);
                  setSingleYourDataDao(false);
                }}
              >
                Go Back
              </button>
            </div>
            <p className="datadao-details-desc padding-div width-peragraph">
              {dataDaoInfo.dataDaoDescription}
            </p>
            <div className="dao-details-flext">
              <table className="dao-details-table">
                <thead>
                  <tr>
                    <th>Token Name</th>
                    <th>No of Tokens</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>DMS</td>
                    <td>100000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="datadao-details-button">
              <button className="create-proposal-btn" onClick={handleOpen2}>
                Create Proposal
              </button>
              <button
                className="create-proposal-btn"
                onClick={() => navigate("/open-existing-data-dao/meet")}
              >
                Start Meet
              </button>
            </div>
          </div>

          <div className="datadao-details-section2">
            <h1 className="datadao-details-dataset">Available Dataset</h1>
            <div className="dataset-main-flex">
              <table className="dataset-main-table">
                <thead>
                  <tr>
                    <div className="daodetails-proposal-name">
                      <th colSpan={2}>MusicCaps</th>
                    </div>
                  </tr>
                </thead>
                <div className="padding-div">
                  <tr>
                    <td>
                      <p className=" width-peragraph">
                        "This dataset contains 5.5k high-quality music captions
                        written by musicians."
                      </p>
                    </td>
                    <td className="datadao-width-btn">
                      {" "}
                      <div className=" ">
                        <button className="datadao-details-extra-btn">
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <h4 className=" width-peragraph">uploaded file</h4>
                    </td>
                    <td>
                      <div className=" datadao-details-btn-padding">
                        <button className="datadao-details-extra-btn">
                          Put on Sell
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4 className="width-peragraph">23/10/2022</h4>
                    </td>
                    <td></td>
                  </tr>
                </div>
              </table>
            </div>
          </div>
        </div>
        <Modal
          open={showCreateProposal}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="create-proposal-parent-div">
            <div className="create-proposal-main-div">
              <div>
                <h1 className="create-proposal-title">New Proposal</h1>
                <p className="create-proposal-desc">
                  Enter the details of a new proposal and submit them.
                </p>

                <div className="create-proposal-div">
                  <label className="create-proposal-label">Title</label>
                  <div className="textfields-width">
                    <input
                      type="text"
                      className="type-width"
                      onChange={(e) =>
                        setProposalInfo({
                          ...proposalInfo,
                          Name: e.target.value,
                        })
                      }
                    />{" "}
                  </div>
                  <label className="create-proposal-label">Description</label>
                  <div className="textfields-width">
                    <textarea
                      rows="70"
                      type="text"
                      className="desc-height"
                      onChange={(e) =>
                        setProposalInfo({
                          ...proposalInfo,
                          Description: e.target.value,
                        })
                      }
                    />
                  </div>{" "}
                  <label className="create-proposal-label">Upload File</label>
                  <div
                    className="proposal-margin-div"
                    onClick={() => fileInputRef.current.click()}
                  >
                    {/* <div>
                      <label className="create-proposal-label">
                        Upload File/Folder
                      </label>
                    </div> */}
                    <img className="up-img" src={uploadfile} alt="upload" />
                    <input
                      type="file"
                      hidden
                      ref={fileInputRef}
                      onChange={(e) => deployEncrypted(e)}
                    />
                  </div>
                  <label className="create-proposal-label">Proposal Date</label>
                  <div className="start-end-div">
                    <input
                      type="text"
                      className="proposal-date"
                      placeholder="Start-Date"
                      ref={inputRef}
                      onChange={(e) =>
                        setProposalInfo({
                          ...proposalInfo,
                          startDate: e.target.value,
                        })
                      }
                      onFocus={() => (inputRef.current.type = "date")}
                      onBlur={() => (inputRef.current.type = "text")}
                    />
                    <input
                      type="text"
                      className="proposal-date  proposal-date1"
                      placeholder="End-Date"
                      ref={inputRefEnd}
                      onChange={(e) =>
                        setProposalInfo({
                          ...proposalInfo,
                          endDate: e.target.value,
                        })
                      }
                      onFocus={() => (inputRefEnd.current.type = "date")}
                      onBlur={() => (inputRefEnd.current.type = "text")}
                    />
                  </div>
                  <div className="uploadfile textfields-width">
                    <button
                      className="create-proposal-btn-popup"
                      onClick={() => createProposal()}
                    >
                      Create Proposal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}
export default YourDataDaoDetails;
