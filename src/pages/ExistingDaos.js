import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "../styles/SelectTemplate.scss";
// import { Button, CardActions } from "@mui/material";
import img from "../assets/section3.jpg";
import img1 from "../assets/LOGO2.png";
// import TemplateDetails from "./TemplateDetails";
import { useNavigate } from "react-router-dom";

function ExistingDaos() {
  const navigate = useNavigate();

  const [data, setData] = useState([
    {
      cover: img,
      title: "Language DAO",
      info: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      hidedatadao: false,
    },
    {
      cover: img1,
      title: "Samhita DAO",
      info: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
      hidedatadao: true,
    },
    // {
    //   cover: img,
    //   title: "Template 3",
    //   info: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    // },
  ]);
  return (
    <div className="select-main">
      <h1>DataDAOs</h1>
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
                  navigate(
                    `${
                      key === 1
                        ? "/open-existing-data-dao/samithadashboard"
                        : `/open-existing-data-dao/${item.title}`
                    }`,
                    {
                      state: {
                        cover: item.cover,
                        title: item.title,
                        info: item.info,
                        hidedatadao: item.hidedatadao,
                      },
                    }
                  );
                }}
              >
                <CardMedia
                  component="img"
                  hidedatadao
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
  );
}

export default ExistingDaos;
