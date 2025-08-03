import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with account:", deployer.address);

  const CouponNFT = await ethers.getContractFactory("CouponNFT");
  const contract = await CouponNFT.deploy(deployer.address);

  await contract.waitForDeployment();

  console.log("CouponNFT deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
