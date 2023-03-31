import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "../styles/SelectTemplate.scss";
import { Button, CardActions } from "@mui/material";
import img from "../assets/proposal.png";
import img1 from "../assets/token.png";
// import TemplateDetails from "./TemplateDetails";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Dashboard.scss";
// import SamithaTokens from "../components/SamithaTokens";
// import Tokens from "../components/Tokens";
import SamithaDaos from "../components/SamithaDaos";
import SamithaDataDaoDetails from "../components/SamithaDataDaoDetails";
import SamithaProposal from "../components/SamithaProposal";
// import AvailabelProposal from "../components/AvailabelProposal";
import AllDataDaos from "../components/AllDataDaos";
import DataDaoDetails from "../components/DataDaoDetails";

function SamithaDashboard() {
  const location = useLocation();
  const [dashboard, setDashboard] = useState(true);
  const [proposals, setProposals] = useState(false);
  //   const [tokens, setTokens] = useState(false);
  const [yourDaos, setYourDaos] = useState(false);
  const [datadaos, setDatadaos] = useState(false);
  const [singleDataDao, setSingleDataDao] = useState(false);
  const [showDataDao, setDataDao] = useState(false);
  const [singleYourDataDao, setSingleYourDataDao] = useState(false);
  const [daoAddress, setDaoAddress] = useState();


  const navigate = useNavigate();

  const dashboardLinks = (a) => {
    if (a === "Dashboard") {
      setDashboard(true);
      setProposals(false);
      setYourDaos(false);
      setDatadaos(false);
    }
    if (a === "Proposals") {
      setDashboard(false);
      setProposals(true);
      setYourDaos(false);
      setDatadaos(false);
    } else if (a === "SamithaDaos") {
      setDashboard(false);
      setProposals(false);
      setYourDaos(true);
      setDatadaos(false);
    } else if (a === "DataDAOs") {
      setDashboard(false);
      setProposals(false);
      setYourDaos(false);
      setDatadaos(true);
    }
  };

  useEffect(() => {
    if (location.state.hidedatadao) {
      setDataDao(true);
    }
  }, []);

  const [data, setData] = useState([
    {
      cover: img,
      title: "Proposals",
      link: "Proposals",
      info: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    },
    {
      cover: img1,
      title: "Tokens",
      link: "Tokens",
      info: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    },
    // {
    //   cover: img,
    //   title: "DataDAOs",
    //   link: "DataDAOs",
    //   info: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    // },
  ]);

  return (
    <div className="dashboard-main">
      <div className="left-db">
        <ul>
          <li
            className={dashboard ? "active" : ""}
            onClick={() => {
              dashboardLinks("Dashboard");
            }}
          >
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <g>
                <rect fill="none" height="24" width="24" />
              </g>
              <g>
                <g>
                  <path d="M5,11h4c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2H5C3.9,3,3,3.9,3,5v4C3,10.1,3.9,11,5,11z" />
                  <path d="M5,21h4c1.1,0,2-0.9,2-2v-4c0-1.1-0.9-2-2-2H5c-1.1,0-2,0.9-2,2v4C3,20.1,3.9,21,5,21z" />
                  <path d="M13,5v4c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-4C13.9,3,13,3.9,13,5z" />
                  <path d="M15,21h4c1.1,0,2-0.9,2-2v-4c0-1.1-0.9-2-2-2h-4c-1.1,0-2,0.9-2,2v4C13,20.1,13.9,21,15,21z" />
                </g>
              </g>
            </svg> */}
            Dashboard
          </li>
          <li
            className={proposals ? "active" : ""}
            onClick={() => {
              dashboardLinks("Proposals");
            }}
          >
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <g>
                <rect fill="none" height="24" width="24" />
              </g>
              <g>
                <g>
                  <path d="M5,11h4c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2H5C3.9,3,3,3.9,3,5v4C3,10.1,3.9,11,5,11z" />
                  <path d="M5,21h4c1.1,0,2-0.9,2-2v-4c0-1.1-0.9-2-2-2H5c-1.1,0-2,0.9-2,2v4C3,20.1,3.9,21,5,21z" />
                  <path d="M13,5v4c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-4C13.9,3,13,3.9,13,5z" />
                  <path d="M15,21h4c1.1,0,2-0.9,2-2v-4c0-1.1-0.9-2-2-2h-4c-1.1,0-2,0.9-2,2v4C13,20.1,13.9,21,15,21z" />
                </g>
              </g>
            </svg> */}
            Proposals
          </li>
          <li
            className={yourDaos ? "active" : ""}
            onClick={() => {
              dashboardLinks("SamithaDaos");
            }}
          >
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <rect fill="none" height="24" width="24" y="0" />
              <path d="M12.97,2.54c-0.6-0.34-1.34-0.34-1.94,0l-7,3.89L9.1,9.24C9.83,8.48,10.86,8,12,8s2.17,0.48,2.9,1.24l5.07-2.82L12.97,2.54z M10,12c0-1.1,0.9-2,2-2s2,0.9,2,2s-0.9,2-2,2S10,13.1,10,12z M3,8.14l5.13,2.85C8.04,11.31,8,11.65,8,12c0,1.86,1.27,3.43,3,3.87 v5.57l-6.97-3.87C3.39,17.22,3,16.55,3,15.82V8.14z M13,21.44v-5.57c1.73-0.44,3-2.01,3-3.87c0-0.35-0.04-0.69-0.13-1.01L21,8.14 l0,7.68c0,0.73-0.39,1.4-1.03,1.75L13,21.44z" />
            </svg> */}
            Samitha DAO
          </li>
          {!showDataDao ? (
            <li
              className={datadaos ? "active" : ""}
              onClick={() => {
                dashboardLinks("DataDAOs");
              }}
            >
              {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M19 13H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM19 3H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
            </svg> */}
              DataDAOs
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
      <div className="right-db">
        {dashboard ? (
          <>
            <div className="select-main" id="right-db-inside">
              <h1>Manage Your DataDAO</h1>
              <p>Click on any datadao to open dashboard for that dao.</p>
              <div className="templates-div">
                {data.map((item, key) => {
                  return (
                    <Card
                      sx={{
                        width: "100%",
                        maxWidth: 400,
                      }}
                      key={key}
                    >
                      <CardActionArea
                        onClick={() => {
                          dashboardLinks(`${item.link}`);
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="180"
                          image={item.cover}
                          alt="green iguana"
                        />
                        <CardContent sx={{}}>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{ textAlign: "center" }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            className="template-info"
                          >
                            {item.info}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  );
                })}
              </div>
            </div>
          </>
        ) : yourDaos ? (
          <SamithaDaos
            setSingleYourDataDao={setSingleYourDataDao}
            setYourDaos={setYourDaos}
            setDaoAddress={setDaoAddress}
          />
        ) : proposals ? (
          <SamithaProposal />
        ) : datadaos ? (
          <AllDataDaos
            setSingleDataDao={setSingleDataDao}
            setDatadaos={setDatadaos}
            setDaoAddress={setDaoAddress}
          />
        ) : singleDataDao ? (
          <DataDaoDetails
            datadaos={datadaos}
            setDatadaos={setDatadaos}
            setSingleDataDao={setSingleDataDao}
            setYourDaos={setYourDaos}
            yourDaos={yourDaos}
            daoAddress={daoAddress}
          />
        ) : singleYourDataDao ? (
          <SamithaDataDaoDetails
            datadaos={datadaos}
            setDatadaos={setDatadaos}
            setSingleYourDataDao={setSingleYourDataDao}
            setYourDaos={setYourDaos}
            yourDaos={yourDaos}
            daoAddress={daoAddress}
          />
        ) : null}
      </div>
    </div>
  );
}

export default SamithaDashboard;
