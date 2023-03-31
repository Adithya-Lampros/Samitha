import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";
import logo from "../assets/LOGO1.png";
import "../styles/navbar.css";
// import { GaslessWalletInterface } from "@gelatonetwork/gasless-onboarding";
// import { GaslessWallet } from "@gelatonetwork/gasless-wallet";
import { gaslessOnboarding } from "./Onboard";
import { useAccount } from "wagmi";

// const pages = ["Products", "Pricing", "Blog"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  let navigate = useNavigate();
  const routeChange = () => {
    // let path = `newPath`;
    navigate("/");
  };
  // const [anchorElNav, setAnchorElNav] = useState();
  // const [anchorElUser, setAnchorElUser] = useState();

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  const { isConnected } = useAccount();
  console.log(isConnected);

  const [walletAddres, setWalletAddress] = useState("");
  const [gaslessWallet, setGaslessWallet] = useState({});
  const [web3AuthProvider, setWeb3AuthProvider] = useState(null);

  console.log(walletAddres);
  console.log(gaslessWallet);
  console.log(web3AuthProvider);

  const login = async () => {
    try {
      await gaslessOnboarding.init();
      const provider = await gaslessOnboarding.login();
      if (provider) {
        setWeb3AuthProvider(provider);
      }

      const gaslessWallet = await gaslessOnboarding.getGaslessWallet();
      if (!gaslessWallet.isInitiated()) await gaslessWallet.init();
      const address = gaslessWallet.getAddress();
      console.log(address);
      setGaslessWallet(gaslessWallet);
      setWalletAddress(address);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await gaslessOnboarding?.logout();

    setWeb3AuthProvider(null);
    setGaslessWallet(undefined);
    setWalletAddress(undefined);
    console.log(gaslessOnboarding);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#FF788E    " }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            onClick={routeChange}
            className="nav-img"
            src={logo}
            // style={{ maxHeight: "250px", width: "230px" }}
            alt="logo"
          />

          {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography> */}
          {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "#1B143E", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box> */}
          <div className="conncet-btn-div">
            {/* <ConnectButton /> */}
            {!isConnected ? (
              <button
                className="connect-btn"
                onClick={() => {
                  login();
                }}
              >
                Connect
              </button>
            ) : (
              <>
                {/* {walletAddress ? <div>{walletAddress}</div> : null} */}
                <button
                  className="connect-btn"
                  onClick={() => {
                    logout();
                  }}
                >
                  Disconnect
                </button>
              </>
            )}
          </div>

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
