pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;

contract Earthquake {
    
    // the earthquake center address
    address payable owner;

    // the social media address
    address payable media;

    // the law enforcement address
    address law;

    // the civil protection address
    address civil;
    
    // The infos structure
    struct Info {
        string city;
        string latitude;
        string longitude;
        string time;
        string published;
        string range; 
        string strength;
        string description;
    }

    // contains the infos about the earthquake !
    Info public info;
    
    // allow only the earthquake center
    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }

    // notify the blockchain that the infos are updated
    event infoEvent ( uint date );
    
    constructor (address payable _media, address _law, address _civil) public payable {
        owner = msg.sender;
        media = _media;
        law = _law;
        civil = _civil;
    }

    // update the infos (for the earthquake center)
    function setInfo(string memory city, string memory latitude, string memory longitude, string memory time, string memory published, string memory range, string memory strength, string memory description) public payable ownerOnly {
        // they mast pay at 1 ether for the infos to be published
        require(msg.value == 1 ether);
        
        // send the ether to the social media
        media.transfer(1 ether);

        // update the info
        info = Info(city, latitude, longitude, time, published, range, strength, description);
        
        // notify the blockchain
        emit infoEvent(now);
    }

    // get the infos for socail media
    function getInfo(address _address) public view returns (Info memory) {    
        // allow only the social media, the law enforcement and the civil protection to get the data
        require( _address == media || _address == law || _address == civil );   

        // send the infos
        return info;
    }
    
}