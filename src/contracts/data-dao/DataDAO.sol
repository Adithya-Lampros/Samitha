// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {CALL_ACTOR_ID, DEFAULT_FLAG, METHOD_SEND, ADMIN_ROLE, MEMBER_ROLE } from "./base/DataDAOConstants.sol";
import "./base/DataDAOCore.sol";
import "./interfaces/IDataDAO.sol";
import "../openzeppelin/contracts/utils/math/SafeMath.sol";
import "../openzeppelin/contracts/access/AccessControl.sol";

contract DataDAO is IDataDAO, DataDAOCore, AccessControl {

    using SafeMath for uint256;

    struct Proposal {
        uint256 proposalID;
        string proposalName;
        string proposalDescription;
        address proposalCreator;
        bytes cidraw;
        uint size;
        uint256 upVoteCount;
        uint256 downVoteCount;
        uint256 proposedAt;
        uint256 proposalExpireAt;
        string status;
    }

    struct VotingConfig{
        uint condition;
        uint minimunApproval;
        uint votingPeriod;
    }
    VotingConfig public votingconfigs;
    // mapping to keep track of proposals
    mapping(uint256 => Proposal) public proposals;

    // mapping array to track whether the user has voted for the proposal
    mapping(address => mapping(uint256 => bool)) public hasVotedForProposal;


    // number of proposals currently in DAO
    uint256 public proposalCount;
    // mapping to check whether the cid is set for voting 
    mapping(bytes => bool) public cidSet;
    // storing the size of the cid
    mapping(bytes => uint) public cidSizes;

    mapping(bytes => mapping(uint64 => bool)) public cidProviders;

    uint public tokenPrice;
    //array of memebrs in the Dao
    address[] allDaoMemberAddress;

    
    /// @dev Gets a cid and returns Deal details associated with the cid
    mapping(bytes => Deal) public deals;

    /// @dev Initializes the admins of the Data DAO
    /// @param _admin: List of Admins(account addresses)
    constructor(address _admin) {
        _setupRole(ADMIN_ROLE, _admin);
    }


    // for getting and setting voting config

    function setDataDaoVotingConfig(uint _condition, uint _minimunApproval,uint _votingPeriod ) public {
        votingconfigs = VotingConfig(_condition,_minimunApproval,_votingPeriod);
    }
    function getDataDaoVotingConfig() public view returns(VotingConfig memory){
        return votingconfigs;
    }

    //for adding and getting dao Members

    function addDaoMember(address _memberAddress, uint _tokenbalance , string memory _customName) public
    {
        //need to add more function here for transferring tokens and subtractiing it fot _tokenSupply
        //Custome name would be blank when creating, can be updated afterwards in addCustomLable Function.
        allDaoMemberAddress.push(_memberAddress);
    }

    /// @dev Add a user to the dao2
    /// @param _userAddress: cid for which the deal proposal is to be created.
    /// @param _role: role that is to be assigned to the user
    function addUser(address _userAddress, bytes32 _role) internal {
        _setupRole(_role, _userAddress);
    }

    /// @dev Creates a new deal proposal. 
    /// @param _cidraw: cid for which the deal proposal is to be created.
    /// @param _size: size of cid
    /// @param _dealDurationInDays: deal duration in Days
    function createDealProposal(bytes memory _cidraw, uint _size, uint256 _dealDurationInDays, string memory _proposalName, string memory _proposalaDescription) internal {
       
        Deal memory newDeal = Deal({
            proposedBy: msg.sender,
            cidraw: _cidraw,
            size: _size,
            storageFees: 0,
            dealStartBlockStamp: 0,
            dealDurationInDays: _dealDurationInDays,
            dealState: DealState.Proposed
        });

        proposalCount++;
        Proposal memory proposal = Proposal(proposalCount,_proposalName,_proposalaDescription, msg.sender, _cidraw, _size, 0, 0, block.timestamp, block.timestamp + 1 hours,"pending");
        proposals[proposalCount] = proposal;

        deals[_cidraw] = newDeal;

    }
   

    function getaAllProposals() public view returns (Proposal[] memory)
    {
        Proposal[] memory allProposals = new Proposal[](proposalCount);
        for(uint i=0;i<proposalCount;i++)
        {
            allProposals[i] = proposals[i];
        }
        return allProposals;
    }

    // function to check whether the function caller is the storage provider

    function isCallerPC(uint256 proposalID) view public returns(bool) {
       return proposals[proposalID].proposalCreator == msg.sender;
    }


    // function to vote in favour of proposal
     
    function upvoteCIDProposal(uint256 proposalID) public {
        require(hasRole(MEMBER_ROLE, msg.sender), "You are not a memeber, You cannot Vote");
        require(!isCallerPC(proposalID), "Proposal Creator cannot vote his own proposal");
        require(!hasVotedForProposal[msg.sender][proposalID], "Already Voted");
        require(proposals[proposalID].proposalExpireAt > block.timestamp, "Voting Period Finished");
        proposals[proposalID].upVoteCount = proposals[proposalID].upVoteCount + 1;
        hasVotedForProposal[msg.sender][proposalID] = true;
    }


    
    // function to vote in favour of proposal
    
    function downvoteCIDProposal(uint256 proposalID) public {
        require(hasRole(MEMBER_ROLE, msg.sender),"You are not a memeber,You cannot Vote");
        require(!isCallerPC(proposalID), "Proposal Creator cannot vote his own proposal");
        require(!hasVotedForProposal[msg.sender][proposalID], "Already Voted");
        require(proposals[proposalID].proposalExpireAt > block.timestamp, "Voting Period Finished");
        proposals[proposalID].downVoteCount = proposals[proposalID].downVoteCount + 1;
        hasVotedForProposal[msg.sender][proposalID] = true;
    }


    /// @dev Approves or Rejects the proposal - This would enable to govern the data that is stored by the DAO 
    /// @param _cidraw: cid of the proposal
    /// @param _proposalId: proposal Id of proposal
    function approveOrRejectDealProposal(bytes memory _cidraw, uint _proposalId) internal {
        require(proposals[_proposalId].proposalExpireAt < block.timestamp, "Voting Period is On");
        DealState _choice;
        if(proposals[_proposalId].upVoteCount > proposals[_proposalId].downVoteCount){
             _choice = DealState.Passed;
            proposals[_proposalId].status = "Passed";

        }
        else{
             _choice = DealState.Rejected;
            proposals[_proposalId].status = "Rejected";

        }

        deals[_cidraw].dealState = _choice;
    }

    /// @dev Activate the deal
    /// @param _networkDealID: Deal ID generated after the deal is created on Filecoin Network 
    function activateDeal(uint64 _networkDealID) internal returns(uint64) {
        MarketTypes.GetDealDataCommitmentReturn memory commitmentRet = MarketAPI.getDealDataCommitment(MarketTypes.GetDealDataCommitmentParams({id: _networkDealID}));
        MarketTypes.GetDealProviderReturn memory providerRet = MarketAPI.getDealProvider(MarketTypes.GetDealProviderParams({id: _networkDealID}));

        authorizeDealData(commitmentRet.data, providerRet.provider, commitmentRet.size);

        MarketTypes.GetDealClientReturn memory clientRet = MarketAPI.getDealClient(MarketTypes.GetDealClientParams({id: _networkDealID}));
        // Activate the deal
        deals[commitmentRet.data].dealState = DealState.Active;
        deals[commitmentRet.data].dealStartBlockStamp = block.timestamp;
        return clientRet.client;
    }

    /// @dev Checks if the provider is already storing the CID
    /// @param _cidraw: cid of the proposal
    /// @param _provider: provider credential
    function policyOK(bytes memory _cidraw, uint64 _provider) internal view returns (bool) {
        bool alreadyStoring = cidProviders[_cidraw][_provider];
        return !alreadyStoring;
    }

    /// @dev Checks if the Deal is valid 
    /// @param _cidraw: cid of the proposal
    /// @param _provider: provider credential
    /// @param _size: size of the cred
    function authorizeDealData(bytes memory _cidraw, uint64 _provider, uint _size) internal {
        // Check if the deal proposal was passsed
        require(deals[_cidraw].dealState == DealState.Passed);
        // Check if the deal dataset size match
        require(deals[_cidraw].size == _size, "data size must match expected");
        require(policyOK(_cidraw, _provider), "deal failed policy check: has provider already claimed this cid?");
        cidProviders[_cidraw][_provider] = true;
    }

    /// @dev Returns current state of the deal
    /// @param _cidraw: Id of the cred.
    function getDealState(bytes memory _cidraw) public view returns (DealState) {

        if(deals[_cidraw].dealState == DealState.Active && (block.timestamp.sub(deals[_cidraw].dealStartBlockStamp)).div(1 days) >= deals[_cidraw].dealDurationInDays) {
            return DealState.Expired;
        } else {
            return deals[_cidraw].dealState;
        }

    }

}