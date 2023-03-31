import {
  GaslessOnboarding,
  GaslessWalletConfig,
  GaslessWalletInterface,
  LoginConfig,
} from "@gelatonetwork/gasless-onboarding";

if (!process.env.REACT_APP_RPC) throw new Error("NEXT_PUBLIC_RPC not found");
const NEXT_PUBLIC_RPC = process.env.REACT_APP_RPC;

if (!process.env.REACT_APP_API_KEY)
  throw new Error("NEXT_PUBLIC_1BALANCE_API_KEY not found");
const NEXT_PUBLIC_1BALANCE_API_KEY = process.env.REACT_APP_API_KEY;

let origin;
if (typeof window !== "undefined") {
  origin = window.location.origin;
}

export const loginConfig = {
  domains: [origin],
  chain: {
    // id: 5, // eth-goerli
    id: 80001, // polygon-mumbai
    rpcUrl: NEXT_PUBLIC_RPC,
  },
  openLogin: {
    redirectUrl: origin,
  },
};

export const gaslessWalletConfig = {
  apiKey: NEXT_PUBLIC_1BALANCE_API_KEY,
};

export const gaslessOnboarding = new GaslessOnboarding(
  loginConfig,
  gaslessWalletConfig
);
