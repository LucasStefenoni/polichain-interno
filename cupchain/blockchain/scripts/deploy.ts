import { ethers } from "hardhat";

async function main() {
  // Pega a lista de contas locais (do Hardhat)
  const [deployer] = await ethers.getSigners();

  console.log("📤 Deploying contract with account:", deployer.address);

  // Obtém a factory (modelo do contrato) do CouponNFT
  const CouponNFT = await ethers.getContractFactory("CouponNFT");

  // Faz o deploy passando o endereço do deployer como initialOwner
  const couponNFT = await CouponNFT.deploy(deployer.address);

  // Espera o deploy terminar
  await couponNFT.waitForDeployment();

  // Exibe o endereço do contrato
  console.log("✅ Contract deployed at:", await couponNFT.getAddress());
}

main().catch((error) => {
  console.error("❌ Deployment error:", error);
  process.exitCode = 1;
});
