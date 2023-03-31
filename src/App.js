import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@rainbow-me/rainbowkit/styles.css";
// import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
// import { configureChains, createClient, WagmiConfig } from "wagmi";
// import { filecoin, filecoinHyperspace } from "wagmi/chains";
// import { alchemyProvider } from "wagmi/providers/alchemy";
// import { publicProvider } from "wagmi/providers/public";
// import wagmiClient from wagmiClient
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { ArcanaConnector } from "@arcana/auth-wagmi";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { filecoinHyperspace, filecoin } from "@wagmi/core/chains";
import { publicProvider } from "wagmi/providers/public";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import SelectTemplate from "./components/SelectTemplate";
import TemplateDetails from "./components/TemplateDetails";
import CreateDao from "./components/stepsform/CreateDao";
import Dashboard from "./pages/Dashboard";
import SamithaDashboard from "./pages/SamithaDashboard";
import ExistingDaos from "./pages/ExistingDaos";
import Huddle from "./components/Huddle";
function App() {
  // const { chains, provider } = configureChains(
  //   [filecoin, filecoinHyperspace],
  //   [
  //     alchemyProvider({ apiKey: "O5NYvtwLMNG0LjAXPQEk0YJT2l3UxTAY" }),
  //     publicProvider(),
  //   ]
  // );
  // const { connectors } = getDefaultWallets({
  //   appName: "My RainbowKit App",
  //   chains,
  // });
  // const wagmiClient = createClient({
  //   autoConnect: true,
  //   connectors,
  //   provider,
  // });
  const ArcanaRainbowConnector = ({ chains }) => {
    return {
      id: "arcana-auth",
      name: "Arcana Wallet",
      iconUrl: "",
      iconBackground: "#101010",
      createConnector: () => {
        const connector = new ArcanaConnector({
          chains,
          options: {
            // appId parameter refers to App Address value in the Dashboard
            appId: "170e12f226356c0a938a0c0cc047a226d10bcabe",
          },
        });
        return {
          connector,
        };
      },
    };
  };

  const connectors = (chains) =>
    connectorsForWallets([
      {
        groupName: "Recommended",
        wallets: [
          ArcanaRainbowConnector({ chains }),
          metaMaskWallet({ chains }),
        ],
      },
    ]);

  const { chains, provider } = configureChains(
    [filecoinHyperspace, filecoin],
    [publicProvider()]
  );

  const wagmiClient = createClient({
    autoConnect: true,
    connectors: connectors(chains),
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className="App">
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/create-data-dao/select-template"
                element={<SelectTemplate />}
              />
              <Route
                path="/create-data-dao/select-template/details"
                element={<TemplateDetails />}
              />
              <Route path="/create-data-dao" element={<CreateDao />} />
              <Route
                path="/open-existing-data-dao"
                element={<ExistingDaos />}
              />
              <Route
                path="/open-existing-data-dao/:id"
                element={<Dashboard />}
              />
              <Route
                path="/open-existing-data-dao/samithadashboard"
                element={<SamithaDashboard />}
              />
              <Route path="/huddle" element={<Huddle />} />
            </Routes>
          </Router>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
