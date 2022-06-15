//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


// Deployed to goerli at 0xCa2E94B7d671C5288d8F25700f1c53739e845843

contract BuyMeACoffee {

  // Event to emit when Memo is emitted
  // Has an indexed address for easy accesss
  event NewMemo(
    address indexed from, 
    uint256 timestamp,
    string name,
    string message
  );

  // struct representing a Memo
  struct Memo {
    address from;
    uint256 timestamp;
    string name;
    string message;
  }

  // list of all memos from friends
  Memo[] memos;

  // address of contract owner
  address payable owner;
   
  // run once when contract is deployed
  constructor() {
    owner = payable(msg.sender);
  }

  /**
  * @dev change the owner of this contract
  * @param newAddress new valid address
   */
  function changeOwner(address newAddress) public {
    require(owner != msg.sender, "You're not permitted to do this action");
    owner = payable(newAddress);
  }

  /**
  * @dev buy a coffee for contract owner
  * @param _name of the coffee buyer
  * @param _message  a nice message from the coffee buyer
   */
  function buyCoffee(string memory _name, string memory _message) public payable {
    require(msg.value > 0, "Can't buy coffee with 0 Eth");
    
    // add the memo to storage
    memos.push(Memo(
      msg.sender,
      block.timestamp,
      _name,
      _message
    ));
     
    // Emit a log event when a new memo is created
    emit NewMemo(msg.sender, block.timestamp, _name, _message);

  }

  /**
   * @dev send the entire balance stored in this contract to owner
   */
  function withDrawTips() public {
    require(owner.send(address(this).balance));
  }

  /**
   * @dev retrieve all the memos stored on the blockchain
   */
  function getMemos() public view returns(Memo[] memory){
    return memos;
  }

}