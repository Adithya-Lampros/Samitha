// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./DataDAO.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DataDAOInstance is DataDAO {

    IERC20 private _membershipToken;

    mapping(bytes => mapping(address => uint256)) public fundings;
    mapping(bytes => uint256) public dealStorageFees;
    mapping(bytes => uint64) public dealClient;

    constructor(address admin, IERC20 _token, uint _condition, uint _minimunApproval, uint _votingPeriod, uint _tokenPrice) DataDAO(admin) {
        _membershipToken = _token;
        votingconfigs.condition = _condition;
        votingconfigs.minimunApproval = _minimunApproval;
        votingconfigs.votingPeriod = _votingPeriod;
        tokenPrice= _tokenPrice;
    }
  
    // /// @dev Function to allow members with membership NFT to join the DAO
    // function buy(uint _amount) public {
    //     require(msg.value >=)
    //     _membershipToken.safeTransfer(msg.sender, _amount)
    //     addUser(msg.sender, MEMBER_ROLE);
    // }

    function isMember() view public returns(bool){
        return _membershipToken.balanceOf(msg.sender) > 0;
    }


    /// @dev Creates a new deal proposal. 
    /// @param _cidraw: cid for which the deal proposal is to be created.
    /// @param _size: size of cid
    /// @param _dealDurationInDays: deal duration in Days
    function createDataSetDealProposal(bytes memory _cidraw, uint _size, uint256 _dealDurationInDays, uint256 _dealStorageFees, string memory _proposalName, string memory _proposalaDescription) public payable {
        require(hasRole(MEMBER_ROLE, msg.sender), "Caller is not a minter");
        createDealProposal(_cidraw, _size, _dealDurationInDays, _proposalName, _proposalaDescription);
        dealStorageFees[_cidraw] = _dealStorageFees;
    }


    /// @dev Approves or Rejects the proposal - This would enable to govern the data that is stored by the DAO
    /// @param _cidraw: Id of the cred.
    /// @param _proposalId: prposal Id of proposal
    function approveOrRejectDataSet(bytes memory _cidraw, uint _proposalId) public {
        require(hasRole(MEMBER_ROLE, msg.sender), "Caller is not a member");
        approveOrRejectDealProposal(_cidraw, _proposalId);
    }

    /// @dev Activates the deal
    /// @param _networkDealID: Deal ID generated after the deal is created on Filecoin Network 
    function activateDataSetDealBySP(uint64 _networkDealID) public {
        uint64 client = activateDeal(_networkDealID);
        MarketTypes.GetDealDataCommitmentReturn memory commitmentRet = MarketAPI.getDealDataCommitment(MarketTypes.GetDealDataCommitmentParams({id: _networkDealID}));
        dealClient[commitmentRet.data] = client;
    }

    /// @dev Once the deal is expired the SP can withdraw the rewards
    /// @param _cidraw: Id of the cred.
    function withdrawReward(bytes memory _cidraw) public {
        require(getDealState(_cidraw) == DealState.Expired);
        reward(dealClient[_cidraw], dealStorageFees[_cidraw]);
    }

}

