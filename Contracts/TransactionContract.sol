// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TipTransaction {
    address public government;
    uint public contractBalance;

    struct Tip {
        address tipper;
        uint amount;
        bool verified;
    }
    
    mapping(address => Tip[]) public submittedTips;

    event TipSubmitted(address indexed tipper, uint amount);
    event TipVerified(address indexed tipper, uint amount, bool isTrue);

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

    function verifyTip(address tipper, uint tipIndex, bool _isTrue) external {
        require(msg.sender == government, "Only government can verify tips");
        require(tipIndex < submittedTips[tipper].length, "Invalid tip index");
        require(!submittedTips[tipper][tipIndex].verified, "Tip already verified");
        
        Tip storage tip = submittedTips[tipper][tipIndex];
        tip.verified = true;
        emit TipVerified(tipper, tip.amount, _isTrue);
        
        if (_isTrue) {
            payable(tipper).transfer(tip.amount);
        } else {
            payable(government).transfer(tip.amount);
        }
        
        contractBalance -= tip.amount;
    }
}



//new latest here
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TipTransaction {
    address public government;
    uint public contractBalance;

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

    function verifyTip(address tipper, uint tipIndex, bool _isTrue, uint augmentationAmount) external {
        require(msg.sender == government, "Only government can verify tips");
        require(tipIndex < submittedTips[tipper].length, "Invalid tip index");
        require(!submittedTips[tipper][tipIndex].verified, "Tip already verified");
        
        Tip storage tip = submittedTips[tipper][tipIndex];
        tip.verified = true;
        
        if (_isTrue) {
            require(augmentationAmount > 0, "Augmentation amount must be greater than 0");
            tip.amount += augmentationAmount;
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
    
    function fundContract() external payable {
        require(msg.sender == government, "Only the government can fund the contract");
        contractBalance += msg.value;
    }
}
