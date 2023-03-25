const hre = require("hardhat");

async function main() {
  const signer = ""
  // setting up mock few usd tokens
  const USDToken = await hre.ethers.getContractFactory("USDToken");
  const usdt = await USDToken.deploy("USD Tether", "USDT");
  const dai = await USDToken.deploy("USD", "DAI");
  const frax = await USDToken.deploy("USD", "FRAX");

  // TODO: mint tokens to a signer and provide liquidity for all the 3 tokens
  console.log(
    `usdt contract deployed at - ${usdt.address}`,
    `dai contract deployed at - ${dai.address}`,
    `frax contract deployed at - ${frax.address}`
  );

  // setting up governance contract
  const Governance = await hre.ethers.getContractFactory("Governance")
  const gov = await Governance.deploy()
  console.log(`governance contract deployed at - ${gov.address}`)

  const aUSD = await hre.ethers.getContractFactory("aUSD");
  const aUSD_deployed = await aUSD.deploy([usdt.address, dai.address, frax.address], gov.address);

  await aUSD_deployed.deployed();
  console.log(`aUSD contract deployed at - ${aUSD.address}`)
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
