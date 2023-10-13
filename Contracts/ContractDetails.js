export const contract_address="0x6fbC56BCfbC7Be57607431F25d5F2919bDd094cb";
export const govt_Address="0x4191B0E7FF2468FA2eF718Ad377f54000AF320E0";

export const contractABI=[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "tipper",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "TipSubmitted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "tipper",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isTrue",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "augmentationAmount",
				"type": "uint256"
			}
		],
		"name": "TipVerified",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "fundContract",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getTips",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "tipper",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "verified",
						"type": "bool"
					}
				],
				"internalType": "struct TipTransaction.Tip[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "submitTip",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "submittedTips",
		"outputs": [
			{
				"internalType": "address",
				"name": "tipper",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "verified",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tipper",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tipIndex",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_isTrue",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "augmentationAmount",
				"type": "uint256"
			}
		],
		"name": "verifyTip",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]