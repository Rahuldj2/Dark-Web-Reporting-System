// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TipTransaction {
    address private government;
    uint private contractBalance;

    struct Tip {
        address tipper;
        uint amount;
        bool verified;
    }
    
    mapping(address => Tip[]) public submittedTips;

    event TipSubmitted(address indexed tipper, uint amount);
    event TipVerified(address indexed tipper, uint amount, bool isTrue, uint augmentationAmount);

    constructor() {
        government = msg.sender;
    }

    function submitTip() external payable {
        require(msg.sender != government, "Government cannot submit tips");
        
        uint amount = msg.value;
        submittedTips[msg.sender].push(Tip({
            tipper: msg.sender,
            amount: amount,
            verified: false
        }));
        
        contractBalance += amount;
        
        emit TipSubmitted(msg.sender, amount);
    }

    //augment issue
    function verifyTip(address tipper, uint tipIndex, bool _isTrue, uint augmentationAmount) external {
        require(msg.sender == government, "Only government can verify tips");
        require(tipIndex < submittedTips[tipper].length, "Invalid tip index");
        require(!submittedTips[tipper][tipIndex].verified, "Tip already verified");
        
        Tip storage tip = submittedTips[tipper][tipIndex];
        tip.verified = true;
        
        if (_isTrue) {
            require(augmentationAmount > 0, "Augmentation amount must be greater than 0");
            uint totalAmt=tip.amount+augmentationAmount;
            tip.amount=totalAmt;
            emit TipVerified(tipper, tip.amount, _isTrue, augmentationAmount);
        } else {
            emit TipVerified(tipper, tip.amount, _isTrue, 0);
        }
        
        if (_isTrue) {
            payable(tipper).transfer(tip.amount);
        } else {
            payable(government).transfer(tip.amount);
        }
        
        contractBalance -= tip.amount;
    }

    function withdraw() external payable{
         require(msg.sender == government, "Only the government can withdraw from the contract");
        payable(government).transfer(contractBalance);
        contractBalance=0;
    }
    
    function fundContract() external payable {
        require(msg.sender == government, "Only the government can fund the contract");
        contractBalance += msg.value;
    }

    function getTips(address user) external view returns (Tip[] memory) {
        require(msg.sender == government || msg.sender==user, "Only the government can view tips");
        return submittedTips[user];
    }

}
