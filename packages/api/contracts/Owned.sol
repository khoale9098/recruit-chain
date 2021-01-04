pragma solidity ^0.5.16;

contract Owned {
    // State variables
    address owner;

    //modifiers
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // constructor
    function Owned() {
        owner = msg.sender;
    }
}
