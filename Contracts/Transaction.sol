// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract TipTransaction {
    address public government;
    uint public tipAmount;
    address public tipper;
    bool public tipVerified;

    event TipSubmitted(address indexed tipper, uint amount);
    event TipVerified(address indexed tipper, bool isTrue);

    //This is called when the contract is created initially
    //only government can create contract and this is a one time job
    constructor() {
        government = msg.sender;
    }

    //This function will be called when anonymous user submits tip
    //Some amount will be deducted from metamask wallet(need to fix one issue)
    //working in remix
    function submitTip() external payable {
        require(msg.sender != government, "Government cannot submit tips");
        tipAmount = msg.value;
        tipper = msg.sender;
        emit TipSubmitted(msg.sender, msg.value);
    }

    //default verify_tip
    //be default true as of now will fix
    function verifyTip(bool _isTrue) external {
        require(msg.sender == government, "Only government can verify tips");
        require(!tipVerified, "Tip already verified");
        tipVerified = true;
        emit TipVerified(tipper, _isTrue);
        if (_isTrue) {
            payable(tipper).transfer(tipAmount);
        } else {
            payable(government).transfer(tipAmount);
        }
    }
}
