import React, { useState } from "react";

function TokenConfiguration({
  handleNext,
  handleBack,
  dataDaoDetails,
  setDataDaoDetails,
}) {
  const [tokenName, setTokenName] = useState();
  const [tokenSymbol, setTokenSymbol] = useState();
  const [tokenHolders, setTokenHolders] = useState();
  const [tokenHolderBalance, setTokenHolderBalance] = useState();

  const goToNext = () => {
    if (!tokenName || !tokenSymbol || !tokenHolders || !tokenHolderBalance) {
      alert("enter token details");
    }
    if (tokenName && tokenSymbol && tokenHolders && tokenHolderBalance) {
      setDataDaoDetails({
        ...dataDaoDetails,
        token_name: tokenName,
        token_symbol: tokenSymbol,
        token_holders: [{ tokenHolders, tokenHolderBalance }],
      });
      handleNext();
    }
  };
  return (
    <div className="create-dao-info-main">
      <h1>Token Configuration</h1>
      <div className="create-dao-token-config-parent">
        <div className="token-config-child-1">
          <h3 className="token-title">Token Name</h3>
          <input
            type="text"
            placeholder="My oraganization Token"
            onChange={(e) => setTokenName(e.target.value)}
          />
        </div>
        <div className="token-config-child-2">
          <h3 className="token-title">Token Symbol</h3>
          <input
            type="text"
            placeholder="JDP"
            onChange={(e) => setTokenSymbol(e.target.value)}
          />
        </div>
      </div>
      <div className="create-dao-token-config-parent">
        <div className="token-config-child-1">
          <h3 className="token-title">Token Holders</h3>
          <input
            type="text"
            placeholder="Account Address"
            onChange={(e) => setTokenHolders(e.target.value)}
          />
        </div>
        <div className="token-config-child-2">
          <h3 className="token-title">Balance</h3>
          <input
            type="text"
            onChange={(e) => setTokenHolderBalance(e.target.value)}
          />
        </div>
      </div>

      <div className="create-dao-back-next-parent">
        <button className="create-dao-back" onClick={handleBack}>
          Back
        </button>
        <button className="create-dao-next" onClick={() => goToNext()}>
          Next
        </button>
      </div>
    </div>
  );
}

export default TokenConfiguration;
