// deploy/00_deploy_your_contract.js

const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  await deploy("YourCollectible", {
    from: deployer,
    log: true,
  });

  // Getting a previously deployed contract
  const yourCollectible = await ethers.getContract("YourCollectible", deployer);

  // ToDo: Verify your contract with Etherscan for public chains
  if (chainId !== "31337") {
    try {
      console.log(" 🎫  Verifing Contract on Etherscan... ");
      await sleep(6000); // wait 3 seconds for deployment to propagate bytecode
      await run("verify:verify", {
        address: yourCollectible.address,
        contract: "contracts/YourCollectible.sol:YourCollectible",
      });
    } catch (e) {
      console.log(" ⚠️ Failed to verify contract on Etherscan ==> ", e);
    }
  }
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports.tags = ["YourCollectible"];
