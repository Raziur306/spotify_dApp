const hre = require("hardhat");

async function main() {
  const spotify = await hre.ethers.getContractFactory('Spotify');
  const contract = await spotify.deploy(); //intitial deployment
  await contract.deployed();
  console.log("Contract Address: ", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
