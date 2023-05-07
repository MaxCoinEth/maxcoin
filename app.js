const contractAddress = '0xCc5AaCC434Aa3f3d24c771Fb5a8E7d23a9Dfc35E';
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_claimAmount",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "_merkleRoot",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "claimAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32[]",
				"name": "_merkleProof",
				"type": "bytes32[]"
			}
		],
		"name": "claimTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasClaimed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "merkleRoot",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "toggleClaim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalClaimed",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newClaimAmount",
				"type": "uint256"
			}
		],
		"name": "updateClaimAmount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_newRoot",
				"type": "bytes32"
			}
		],
		"name": "updateMerkleRoot",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "updateOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newToken",
				"type": "address"
			}
		],
		"name": "updateToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const merkleRoot = '0xa4afa9d7950e43bba0502f65bfa9d6c486291902fcc394eee35f4efc6498f08a';

let web3;
let userAccount;
let contract;
let proofs;

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    contract = new web3.eth.Contract(contractABI, contractAddress);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAccount = (await web3.eth.getAccounts())[0];
      document.getElementById('connectButton').style.display = 'none';


      // Read the proofs object from proofs.json
      const response = await fetch('./proofs.json');
      proofs = await response.json();

      // Check if the user has a valid proof
      if (proofs[userAccount]) {
        document.getElementById('claimButton').disabled = false;
      } else {
        alert('Your address does not have a valid proof.');
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    alert('Please install MetaMask or another compatible wallet.');
  }
}

async function claimTokens() {
    const userProof = proofs[userAccount];
    console.log(userProof);
    try {
      await contract.methods.claimTokens(userProof).send({ from: userAccount });
      alert('Tokens claimed successfully!');
    } catch (error) {
      console.error(error);
      alert('Error claiming tokens. Please try again.');
    }
  }

async function getTotalClaimed() {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    const totalClaimed = await contract.methods.totalClaimed().call({ from: account });
    let convValue = (totalClaimed / 10 ** 18).toFixed(0);

    document.getElementById('totalClaimed').innerHTML = `Total Claimed: ${convValue}`;
}

window.addEventListener('DOMContentLoaded', () => {
    getTotalClaimed();
});

document.getElementById('connectButton').addEventListener('click', connectWallet);
document.getElementById('claimButton').addEventListener('click', claimTokens);
