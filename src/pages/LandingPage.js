import React from "react";
// import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Magnifier from "react-magnifier";
import { GrInstagram, GrFacebook, GrLinkedin } from "react-icons/gr";
import { BsGlobe2, BsFillTelephoneFill } from "react-icons/bs";
import "../styles/LandingPage.scss";
import Logo from "../assets/LOGO1.png";
import Hero from "../assets/hero.png";
// import Hero1 from "../assets/hero1.png";

function LandingPage() {
  const navigate = useNavigate();
  const openCreateDaoPage = () => {
    navigate("/create-data-dao/select-template");
  };
  const openExistingDaoPage = () => {
    navigate("/open-existing-data-dao");
  };
  return (
    <>
      <div className="hero-main">
        <div className="hero">
          {/* <img src={Hero1} alt="samitha" /> */}
          <h1>SamhitaDAO</h1>
          <p>Create your own DataDao in few minutes with ease.</p>

          <div className="hero-btns">
            <button
              className="create-dao-btn"
              onClick={() => openCreateDaoPage()}
            >
              Create DataDao
            </button>
            <button
              className="existing-dao-btn"
              onClick={() => openExistingDaoPage()}
            >
              Existing DataDao
            </button>
          </div>
        </div>
        <div className="hero-right">
          <Magnifier src={Hero} alt="hero" mgWidth={300} mgHeight={300}/>
        </div>
      </div>
      <div className="hero-footer">
        <div>
          <img className="hero-footer-img" src={Logo} alt="Logo" />
        </div>
        <div className="hero-footer-right-main">
          <GrInstagram className="hero-footer-logo" />
          <GrFacebook className="hero-footer-logo" />
          <GrLinkedin className="hero-footer-logo" />
          <BsGlobe2 className="hero-footer-logo" />
          <BsFillTelephoneFill className="hero-footer-logo" />
          <p className="hero-footer-copy">
            Copyright Ⓒ 2022 SamhitaDAO | All rights reserved
          </p>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
