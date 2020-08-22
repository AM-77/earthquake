pragma solidity ^0.5.3;

contract Earthquake {
    
    // the earthquake center address
    address payable owner;

    // the social media address
    address payable media;
    
    // contains the infos about the earthquake !
    string public info;
    
    // allow only the earthquake center
    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }

    // notify the blockchain that the infos are updated
    event infoEvent ( uint date );
    
    constructor (address payable _media) public payable {
        owner = msg.sender;
        media = _media;
    }
        
    // update the infos (for the earthquake center)
    function setInfo(string memory the_info) public payable ownerOnly {
        // they mast pay at 1 ether for the infos to be published
        require(msg.value == 1 ether);

        // send the ether to the social media
        media.transfer(1 ether);

        // update the info
        info = the_info;
        
        // notify the blockchain
        emit infoEvent(now);
    }

    // get the infos for socail media
    function getInfo(address _media) public view returns (string memory) {    
        // allow only the social media to get the data
        require(media == _media);   

        // send the infos
        return info;
    }
    
}