//Run this file to generate the MerkleRoot and proofs.json file
//replace merkleRoot into app.js
//replace contractAddress (and ABI if needed)
//run index.html on a localhost to test

//install these with NPM if you havent

const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

const fs = require('fs');

//the list of recipients
const addresses = [
 "0x634f64Dd7BD1126AE40e94d7deb723433b4843E5",
"0x6855d221FC9618a9Fdf28B9DbCed933cb9d2c9e9",
"0x9a97cd2c99b7bb0708b7e43152d618ed68d9349f",
"0x6620A7C3A0Da714F24a03f9B5F09893F77c6AD0f",
"0x5F7Ae3aF7D7009cC3a51fa0B3D741C76C6E28A0A",
"0xE3E2BE10c2E3d2D7731cb20bF78AA5AcbDBB9Cd2",
"0xFCFB12a027739614d460778906946712794ed2a4",
"0x82FBb28bC2e96C5E4289ea2114a6Ba6991b9A9b4",
"0xcD7a0680c14b13618bf119FF899Ed10Ca4dBCcCc",
"0x1B2551eEb351397c5ea2B1a64B4A7F9F4f6878CA",
"0x4F646848a0A99abC33A4FF35F232DC24558B96AE",
"0xd41aca80b32c23758c119bfcced0da6e3c681deb",
"fredu.eth",
"0xADAfeC7a9818338C3560d1a35c1a04273C253b4D",
"0xf385268eFb19598dD54667FD0B516aDaA349346E",
"0xf541fb8bCF0F7b4925a040a188D1532288054dbC",
"0xbEda85D41152b2eb9Cef6D24FE6848C3eC262da6",
"jasky.eth",
"0x66f0cC612bADbff7585e91b15F3c364230Ba2d4b",
"0x2eE140FA48D3f53f8e0bB20cd1fCC11bA7178eC5",
"0xc6119230093feB63407665CFE5d82d0D65056C16",
"0xa6b609b5c1beda9b2c76d169f6159f0a6ffe7fe0",
"Mickeythemouse.eth",
"goul.guardianof.eth",
"0x8348735e5192371aB899118d5CF9fB258d7Ce5C0",
"0x3Fd1BAF0eBf3aE84B436FCfa22cFef5e639D93c2",
"0xf1a83E65543C28403316C0eCAbDFFac01dbB22cc",
"0xD371b1Ca1918Dcf0655409a3D0c8dFd67F111BbA",
"0x6bf54765D77A2AC1eBb8CC945bc496435398efd3",
"0x9508541FB370986a978d3be2A099cA141ECd6073",
"0xba3a4E5214Aa766D6dd977124d32627CB8560254",
"0x0f25C3bFB5919155e8A61bf3a7d6F3b0Ad9243E1",
"0x6B4dc1BCD55E899822B91A6B7CBA95ec21de6524",
"0x6B9C6EeFF89498FcBA28e136272Fec0020764384",
"0x4F6Da128dA8A7eeC937730490eA7C61F5D4F5788",
"0x88EE8AeA7b767769eC9c29a01D085f18aed7da83",
"0x64488bc7fd3c065b8e8c0903e2b80e9e6c7cc7ec",
"0xd1e7d78AC9b471773beEBB17fa17f8961CF8E054",
"0x25d593A3788D872605C69dC41c38637023AEC292",
"0xa7d41dDD28B95066E605F020ED9ab310aCD6C90e",
"0xCe85a7CE7eAeE3B0F37CDf0EDCBE0Be827aA9a9f",
"0x97A6413311500CA4e4D0d4dbeFc0bf4E14E1a59B",
"0x05A35b5Eb7D349A1C1c2137988E616A7DC3019eA",
"0xe9C8C25038bF05DFC4E408b42D5751Ab6af30b85",
"0xcCcAC9314d6D58e912E1300d422e860A61907e78",
"0x0B9D0Cf9a959E04a85Fb0e5ddd0C84eaD907c952",
"Glizzybro.eth",
"0x96cFaF4B6D3d47cC51d4Fb46D38C916d12A7024E",
"0x08bA8967bEd5F7796F73d277b9F3755EF56da855",
"0x5f6CEa507fc46580e577257b29C8dF48f1e4F802",
"mallcop.eth",
"0xC122365082aC5a20e5180241704bC4B2b209207f",
"0x730Aba725664974eFB753ee72cA789541C733Db4",
"0x800852fb2974059716E9fb3D5e98D8A1E0042331",
"0xd7668a45713e8f7258e7D01D2dBae18fAda1e329",
"0x03c01DDA0D1338e221dFD469C870AB21DCF1F95E",
"0xC1C0A519B55dE97Ae3F17228524a44f596bF87a7",
"0xc9be9069F1fD43b82145Fa8709050D52d803E81a",
"0xd00d42FDA98e968d8EF446a7f8808103fA1b3fD6",
  // ... more addresses
];

const hashedAddresses = addresses.map((address) => keccak256(address));
const merkleTree = new MerkleTree(hashedAddresses, keccak256, { sortPairs: true });
const merkleRoot = merkleTree.getHexRoot();
console.log("Merkle Root:", merkleRoot);

const proofsObject = {};

addresses.forEach((address) => {
  const proof = merkleTree.getHexProof(keccak256(address));
  proofsObject[address] = proof;
});

fs.writeFileSync('proofs.json', JSON.stringify(proofsObject, null, 2), 'utf-8');