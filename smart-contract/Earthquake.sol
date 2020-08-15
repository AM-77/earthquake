pragma solidity ^0.5.3;

contract Earthquake {
    
    // the earthquake center should deploy the smart contract
    address payable owner;
    
    // contains the infos about the earthquake !
    string public info;
    
    
    // allow only the earthquake center to update the info
    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }
    
    // notify the blockchain that the infos are updated
    event infoEvent ( uint date );
    
    constructor () public payable{
        owner = msg.sender;
    }
    
    // get the infos (for socail media )
    function getInfo() public payable returns (string memory) {
        
        // they mast pay at 1 ether for the infos
        require(msg.value == 1000000000000000000);
        
        // senf the ether to the earthquake center
        owner.transfer(1000000000000000000);
        
        // send the infos to the socail media system
        return info;
    }
    
    // update the infos (for the earthquake center)
    function setInfo(string memory the_info) public ownerOnly {
        //update the info
        info = the_info;
        
        // triger the event in the blockchain
        emit infoEvent(now);
    }
    
}